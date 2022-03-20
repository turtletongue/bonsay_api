import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

import { User } from '@users/entities/user.entity';
import { UsersService } from '@users/users.service';
import { RefreshTokenPayload } from '@app/declarations';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokensRepository } from './refresh-tokens.repository';

@Injectable()
export class TokensService {
  private readonly usersService: UsersService;
  private readonly jwt: JwtService;
  private readonly tokensRepository: RefreshTokensRepository;

  public constructor(
    usersService: UsersService,
    jwt: JwtService,
    tokensRepository: RefreshTokensRepository,
  ) {
    this.usersService = usersService;
    this.jwt = jwt;
    this.tokensRepository = tokensRepository;
  }

  public async generateAccessToken(user: User): Promise<string> {
    const options: SignOptions = {
      subject: String(user.id),
    };

    return this.jwt.signAsync({}, options);
  }

  public async generateRefreshToken(
    user: User,
    expiresIn: number,
  ): Promise<string> {
    const token = await this.tokensRepository.createRefreshToken(
      user,
      expiresIn,
    );

    const options: SignOptions = {
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.id),
    };

    return this.jwt.signAsync({}, options);
  }

  public async resolveRefreshToken(
    encoded: string,
  ): Promise<{ user: User; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (token.isRevoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { user, token };
  }

  public async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<{ token: string; user: User }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);

    return { user, token };
  }

  public async revokeRefreshToken(encoded: string) {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    return this.tokensRepository.revoke(token.id);
  }

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return await this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const userId = payload.sub;

    if (!userId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.usersService.findOne(userId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.tokensRepository.findOne(tokenId);
  }
}

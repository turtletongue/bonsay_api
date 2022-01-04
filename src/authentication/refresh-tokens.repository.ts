import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';

import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokensRepository {
  public constructor(
    @InjectRepository(RefreshToken)
    private refreshTokensRepository: Repository<RefreshToken>,
  ) {}

  public async createRefreshToken(
    user: User,
    timeToLive: number,
  ): Promise<RefreshToken> {
    return this.refreshTokensRepository.save({
      userId: user.id,
      expiresAt: new Date(Date.now() + timeToLive),
    });
  }

  public async findOne(id: number): Promise<RefreshToken | null> {
    return this.refreshTokensRepository.findOne(id);
  }

  public async revoke(id: number): Promise<RefreshToken | null> {
    return this.refreshTokensRepository.save({ id, isRevoked: true });
  }
}

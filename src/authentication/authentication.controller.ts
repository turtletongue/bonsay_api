import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

import { UsersService } from 'src/users/users.service';
import { WEEK } from 'src/utils/variables';
import { AuthenticationDto } from './dto/authentication.dto';
import { TokensService } from './tokens.service';

interface RefreshRequest {
  refreshToken: string;
}

interface RevokeRequest {
  refreshToken: string;
}

@Controller('authentication')
export class AuthenticationController {
  private readonly usersService: UsersService;
  private readonly tokensService: TokensService;

  public constructor(tokensService: TokensService, usersService: UsersService) {
    this.tokensService = tokensService;
    this.usersService = usersService;
  }

  @Post()
  public async create(@Body() { email, password }: AuthenticationDto) {
    const user = (
      await this.usersService.findAll({
        $limit: 1,
        email,
      })
    ).data[0];

    const valid = user
      ? await this.usersService.validateCredentials(user.id, password)
      : false;

    if (!valid) {
      throw new BadRequestException('Invalid email or password');
    }

    const accessToken = await this.tokensService.generateAccessToken(user);
    const refreshToken = await this.tokensService.generateRefreshToken(
      user,
      WEEK,
    );

    return this.buildResponsePayload(user, accessToken, refreshToken);
  }

  @Post('/refresh')
  public async refresh(@Body() body: RefreshRequest) {
    if (!body.refreshToken) {
      throw new BadRequestException('Refresh token must be provided');
    }

    const { user, token } =
      await this.tokensService.createAccessTokenFromRefreshToken(
        body.refreshToken,
      );

    const payload = this.buildResponsePayload(user, token);

    return {
      status: 'success',
      data: payload,
    };
  }

  @Post('/revoke')
  public async revoke(@Body() body: RevokeRequest) {
    if (!body.refreshToken) {
      throw new BadRequestException('Refresh token must be provided');
    }

    const token = await this.tokensService.revokeRefreshToken(
      body.refreshToken,
    );

    return {
      status: token.isRevoked ? 'success' : 'fail',
    };
  }

  private buildResponsePayload(
    user: User,
    accessToken: string,
    refreshToken?: string,
  ) {
    return {
      user,
      payload: {
        accessToken,
        ...(refreshToken ? { refreshToken } : {}),
      },
    };
  }
}

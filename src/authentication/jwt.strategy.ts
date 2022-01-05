import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtExpiresIn } from 'src/utils/variables';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ClientsService } from 'src/clients/clients.service';

export interface AccessTokenPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private users: UsersService,
    private clients: ClientsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: jwtExpiresIn,
      },
    });
  }

  async validate(payload: AccessTokenPayload): Promise<User> {
    const { sub: id } = payload;

    const user = await this.users.findOne(id);

    if (!user) {
      return null;
    }

    if (user.role === 'client') {
      const clients = await this.clients.findAll({ userId: user.id });

      user.client = clients.data[0];
    }

    return user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err: Error, user: any, info: Error) {
    if (err || info || !user) {
      throw new UnauthorizedException(err?.message || info?.message || '');
    }

    return user;
  }
}

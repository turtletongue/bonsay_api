import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';
import { jwtExpiresIn } from 'src/utils/variables';
import { AuthenticationController } from './authentication.controller';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { TokensService } from './tokens.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    PassportModule.register({}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: jwtExpiresIn,
      },
    }),
    UsersModule,
  ],
  controllers: [AuthenticationController],
  providers: [RefreshTokensRepository, JwtStrategy, TokensService],
})
export class AuthenticationModule {}

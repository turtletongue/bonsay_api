import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormConfig } from './ormconfig';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AddressesModule } from './addresses/addresses.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    AuthenticationModule,
    AddressesModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

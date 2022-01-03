import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormConfig } from './ormconfig';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

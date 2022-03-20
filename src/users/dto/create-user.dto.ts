import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

import { Role } from '@app/declarations';
import { MIN_PASSWORD_LENGTH } from '@utils/variables';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(MIN_PASSWORD_LENGTH)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: ['admin', 'client'], nullable: true })
  @IsIn(['admin', 'client'])
  @IsOptional()
  role?: Role;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

import { MIN_PASSWORD_LENGTH } from '@utils/variables';

export class CreateClientDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(MIN_PASSWORD_LENGTH)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsOptional()
  userId?: number;
}

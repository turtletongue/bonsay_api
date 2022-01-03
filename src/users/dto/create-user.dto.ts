import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: ['admin', 'client'], nullable: true })
  @IsIn(['admin', 'client'])
  @IsOptional()
  role?: 'admin' | 'client';
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { IFieldQuery } from 'src/declarations';

export class FindUserDto {
  @ApiProperty()
  @IsOptional()
  $limit?: number;

  @ApiProperty()
  @IsOptional()
  $skip?: number;

  @ApiProperty()
  @IsOptional()
  id?: number | IFieldQuery<number>;

  @ApiProperty()
  @IsOptional()
  email?: string | IFieldQuery<string>;

  @ApiProperty()
  @IsOptional()
  role?: 'admin' | 'client' | IFieldQuery<'admin' | 'client'>;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date | IFieldQuery<Date>;

  @ApiProperty()
  @IsOptional()
  updateAt?: Date | IFieldQuery<Date>;
}

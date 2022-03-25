import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { IFieldQuery, OrderStatus } from '@app/declarations';

export class FindOrderDto {
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
  phone?: string;

  @ApiProperty()
  @IsOptional()
  addressId?: number;

  @ApiProperty()
  @IsOptional()
  clientId?: number;

  @ApiProperty()
  @IsOptional()
  status?: OrderStatus | IFieldQuery<string>;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date | IFieldQuery<Date>;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date | IFieldQuery<Date>;
}

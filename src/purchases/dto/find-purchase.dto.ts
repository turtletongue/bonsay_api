import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { IFieldQuery } from '@app/declarations';

export class FindPurchaseDto {
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
  productId?: number;

  @ApiProperty()
  @IsOptional()
  orderId?: number;

  @ApiProperty()
  @IsOptional()
  clientId?: number;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date | IFieldQuery<Date>;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date | IFieldQuery<Date>;
}

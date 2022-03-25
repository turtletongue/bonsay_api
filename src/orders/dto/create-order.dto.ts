import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { OrderStatus } from '@app/declarations';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  addressId: number;

  @ApiProperty()
  @IsOptional()
  clientId?: number;

  @ApiProperty()
  @IsOptional()
  purchases: {
    productId: number;
  }[];

  @ApiProperty()
  @IsOptional()
  status: OrderStatus;
}

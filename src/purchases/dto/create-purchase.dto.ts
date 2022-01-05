import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  qty: number;

  @ApiProperty()
  @IsNotEmpty()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  clientId: number;
}

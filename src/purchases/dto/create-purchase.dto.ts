import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePurchaseDto {
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

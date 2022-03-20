import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  sum: number;

  @ApiProperty()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty()
  @IsNotEmpty()
  tokenId: string;

  @ApiProperty()
  @IsOptional()
  clientId?: number;
}

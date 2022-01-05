import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsIn } from 'class-validator';

import { Status } from 'src/declarations';

export class CreatePaymentDto {
  @ApiProperty({ enum: ['wait', 'success', 'fail'], nullable: true })
  @IsIn(['wait', 'success', 'fail'])
  @IsOptional()
  status?: Status;

  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  sum: number;

  @ApiProperty()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty()
  @IsOptional()
  clientId?: number;
}

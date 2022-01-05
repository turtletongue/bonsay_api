import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  height: number;

  @ApiProperty()
  @IsDateString()
  birthdate: Date;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: number;
}

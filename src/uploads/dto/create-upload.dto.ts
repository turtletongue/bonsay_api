import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUploadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  originalName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  fileName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  path: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  internalPath: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  mimetype: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  size: string;
}

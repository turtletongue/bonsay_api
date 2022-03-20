import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { IFieldQuery } from '@app/declarations';

export class FindUploadDto {
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
  originalName?: string;

  @ApiProperty()
  @IsOptional()
  fileName?: string;

  @ApiProperty()
  @IsOptional()
  path?: string;

  @ApiProperty()
  @IsOptional()
  internalPath?: string;

  @ApiProperty()
  @IsOptional()
  mimetype?: string;

  @ApiProperty()
  @IsOptional()
  size?: string;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date | IFieldQuery<Date>;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date | IFieldQuery<Date>;
}

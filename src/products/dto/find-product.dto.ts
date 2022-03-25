import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { IFieldQuery } from '@app/declarations';

export class FindProductDto {
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
  price?: number | IFieldQuery<number>;

  @ApiProperty()
  @IsOptional()
  name?: string | IFieldQuery<string>;

  @ApiProperty()
  @IsOptional()
  isAvailable?: boolean | IFieldQuery<boolean>;

  @ApiProperty()
  @IsOptional()
  description?: string | IFieldQuery<string>;

  @ApiProperty()
  @IsOptional()
  height?: number | IFieldQuery<number>;

  @ApiProperty()
  @IsOptional()
  birthdate?: Date | IFieldQuery<Date>;

  @ApiProperty()
  @IsOptional()
  categoryId?: number;

  @ApiProperty()
  @IsOptional()
  uploadId?: number;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date | IFieldQuery<Date>;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date | IFieldQuery<Date>;
}

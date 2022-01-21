import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IFieldQuery } from 'src/declarations';

export class FindCategoryDto {
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
  name?: string | IFieldQuery<string>;

  @ApiProperty()
  @IsOptional()
  description?: string | IFieldQuery<string>;

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

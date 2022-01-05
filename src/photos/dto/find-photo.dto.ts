import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IFieldQuery } from 'src/declarations';

export class FindPhotoDto {
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
  productId?: number;

  @ApiProperty()
  @IsOptional()
  uploadId?: number;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date | IFieldQuery<Date>;

  @ApiProperty()
  @IsOptional()
  updateAt?: Date | IFieldQuery<Date>;
}

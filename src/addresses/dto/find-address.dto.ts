import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IFieldQuery } from 'src/declarations';

export class FindAddressDto {
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
  city?: string | IFieldQuery<string>;

  @ApiProperty()
  @IsOptional()
  street?: string | IFieldQuery<string>;

  @ApiProperty()
  @IsOptional()
  house?: string | IFieldQuery<string>;

  @ApiProperty()
  @IsOptional()
  postcode?: string | IFieldQuery<string>;

  @ApiProperty()
  @IsOptional()
  clientId?: number;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date | IFieldQuery<Date>;

  @ApiProperty()
  @IsOptional()
  updateAt?: Date | IFieldQuery<Date>;
}

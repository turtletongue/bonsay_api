import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { IFieldQuery, Status } from '@app/declarations';

export class FindPaymentDto {
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
  status?: Status | IFieldQuery<Status>;

  @ApiProperty()
  @IsOptional()
  sum?: number | IFieldQuery<number>;

  @ApiProperty()
  @IsOptional()
  orderId?: number;

  @ApiProperty()
  @IsOptional()
  clientId?: number;

  @ApiProperty()
  @IsOptional()
  tokenId?: string;

  @ApiProperty()
  @IsOptional()
  createdAt?: Date | IFieldQuery<Date>;

  @ApiProperty()
  @IsOptional()
  updatedAt?: Date | IFieldQuery<Date>;
}

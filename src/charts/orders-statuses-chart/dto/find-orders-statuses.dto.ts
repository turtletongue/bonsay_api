import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindOrdersStatusesDto {
  @ApiProperty()
  @IsOptional()
  startDate?: Date;

  @ApiProperty()
  @IsOptional()
  endDate?: Date;
}

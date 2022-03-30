import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { JWTGuard } from '@authentication/jwt.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { Roles } from '@utils/decorators/role.decorator';
import { RevenueChartService } from './revenue-chart.service';
import { FindRevenueDataDto } from './dto/find-revenue-data.dto';

@Controller('charts/revenue-chart')
@UseGuards(JWTGuard, RolesGuard)
@Roles('admin')
export class RevenueChartController {
  constructor(private readonly revenueChartService: RevenueChartService) {}

  @Get()
  public async get(@Query() query: FindRevenueDataDto) {
    return this.revenueChartService.get(query);
  }
}

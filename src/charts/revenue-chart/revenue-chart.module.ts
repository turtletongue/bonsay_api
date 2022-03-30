import { Module } from '@nestjs/common';

import { RevenueChartService } from './revenue-chart.service';
import { RevenueChartController } from './revenue-chart.controller';

@Module({
  controllers: [RevenueChartController],
  providers: [RevenueChartService],
})
export class RevenueChartModule {}

import { Module } from '@nestjs/common';

import { OrdersCountChartService } from './orders-count-chart.service';
import { OrdersCountChartController } from './orders-count-chart.controller';

@Module({
  controllers: [OrdersCountChartController],
  providers: [OrdersCountChartService],
})
export class OrdersCountChartModule {}

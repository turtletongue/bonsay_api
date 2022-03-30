import { Module } from '@nestjs/common';

import { OrdersStatusesChartService } from './orders-statuses-chart.service';
import { OrdersStatusesChartController } from './orders-statuses-chart.controller';

@Module({
  controllers: [OrdersStatusesChartController],
  providers: [OrdersStatusesChartService],
})
export class OrdersStatusesChartModule {}

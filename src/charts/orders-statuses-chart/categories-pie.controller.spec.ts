import { Test, TestingModule } from '@nestjs/testing';

import { OrdersStatusesChartController } from './orders-statuses-chart.controller';
import { OrdersStatusesChartService } from './orders-statuses-chart.service';

describe('OrdersStatusesChartController', () => {
  let controller: OrdersStatusesChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersStatusesChartController],
      providers: [OrdersStatusesChartService],
    }).compile();

    controller = module.get<OrdersStatusesChartController>(
      OrdersStatusesChartController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

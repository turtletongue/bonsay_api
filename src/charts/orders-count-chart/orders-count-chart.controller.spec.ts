import { Test, TestingModule } from '@nestjs/testing';

import { OrdersCountChartController } from './orders-count-chart.controller';
import { OrdersCountChartService } from './orders-count-chart.service';

describe('OrdersCountChartController', () => {
  let controller: OrdersCountChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersCountChartController],
      providers: [OrdersCountChartService],
    }).compile();

    controller = module.get<OrdersCountChartController>(
      OrdersCountChartController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { OrdersCountChartService } from './orders-count-chart.service';

describe('OrdersCountChartService', () => {
  let service: OrdersCountChartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersCountChartService],
    }).compile();

    service = module.get<OrdersCountChartService>(OrdersCountChartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

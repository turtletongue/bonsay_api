import { Test, TestingModule } from '@nestjs/testing';

import { OrdersStatusesChartService } from './orders-statuses-chart.service';

describe('OrdersStatusesChartService', () => {
  let service: OrdersStatusesChartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersStatusesChartService],
    }).compile();

    service = module.get<OrdersStatusesChartService>(
      OrdersStatusesChartService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

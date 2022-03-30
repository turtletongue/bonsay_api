import { Test, TestingModule } from '@nestjs/testing';

import { RevenueChartController } from './revenue-chart.controller';
import { RevenueChartService } from './revenue-chart.service';

describe('RevenueChartController', () => {
  let controller: RevenueChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevenueChartController],
      providers: [RevenueChartService],
    }).compile();

    controller = module.get<RevenueChartController>(RevenueChartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

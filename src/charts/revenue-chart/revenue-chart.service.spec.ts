import { Test, TestingModule } from '@nestjs/testing';

import { RevenueChartService } from './revenue-chart.service';

describe('RevenueChartService', () => {
  let service: RevenueChartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevenueChartService],
    }).compile();

    service = module.get<RevenueChartService>(RevenueChartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

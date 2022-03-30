import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesPieService } from './categories-pie.service';

describe('CategoriesPieService', () => {
  let service: CategoriesPieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesPieService],
    }).compile();

    service = module.get<CategoriesPieService>(CategoriesPieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

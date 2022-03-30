import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesPieController } from './categories-pie.controller';
import { CategoriesPieService } from './categories-pie.service';

describe('CategoriesPieController', () => {
  let controller: CategoriesPieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesPieController],
      providers: [CategoriesPieService],
    }).compile();

    controller = module.get<CategoriesPieController>(CategoriesPieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

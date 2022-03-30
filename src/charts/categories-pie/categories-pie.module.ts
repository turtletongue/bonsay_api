import { Module } from '@nestjs/common';

import { CategoriesPieService } from './categories-pie.service';
import { CategoriesPieController } from './categories-pie.controller';

@Module({
  controllers: [CategoriesPieController],
  providers: [CategoriesPieService],
})
export class CategoriesPieModule {}

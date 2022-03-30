import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { JWTGuard } from '@authentication/jwt.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { Roles } from '@utils/decorators/role.decorator';
import { CategoriesPieService } from './categories-pie.service';
import { FindCategoriesPieDto } from './dto/find-categories-pie-data.dto';

@Controller('charts/categories-pie')
@UseGuards(JWTGuard, RolesGuard)
@Roles('admin')
export class CategoriesPieController {
  constructor(private readonly categoriesPieService: CategoriesPieService) {}

  @Get()
  public async get(@Query() query: FindCategoriesPieDto) {
    return this.categoriesPieService.get(query);
  }
}

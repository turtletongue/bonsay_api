import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { JWTGuard } from '@authentication/jwt.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { Roles } from '@utils/decorators/role.decorator';
import { OrdersCountChartService } from './orders-count-chart.service';
import { FindOrdersCountDataDto } from './dto/find-orders-count-data.dto';

@Controller('charts/orders-count-chart')
@UseGuards(JWTGuard, RolesGuard)
@Roles('admin')
export class OrdersCountChartController {
  constructor(
    private readonly ordersCountChartService: OrdersCountChartService,
  ) {}

  @Get()
  public async get(@Query() query: FindOrdersCountDataDto) {
    return this.ordersCountChartService.get(query);
  }
}

import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { JWTGuard } from '@authentication/jwt.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { Roles } from '@utils/decorators/role.decorator';
import { OrdersStatusesChartService } from './orders-statuses-chart.service';
import { FindOrdersStatusesDto } from './dto/find-orders-statuses.dto';

@Controller('charts/orders-statuses')
@UseGuards(JWTGuard, RolesGuard)
@Roles('admin')
export class OrdersStatusesChartController {
  constructor(
    private readonly ordersStatusesChartService: OrdersStatusesChartService,
  ) {}

  @Get()
  public async get(@Query() query: FindOrdersStatusesDto) {
    return this.ordersStatusesChartService.get(query);
  }
}

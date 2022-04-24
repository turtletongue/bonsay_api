import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Order } from '@orders/entities/order.entity';
import { MONTH_MS, ORDER_STATUSES } from '@utils/variables';
import { FindOrdersStatusesDto } from './dto/find-orders-statuses.dto';

@Injectable()
export class OrdersStatusesChartService {
  constructor(@InjectConnection() private connection: Connection) {}

  public async get(query: FindOrdersStatusesDto) {
    const endDate = (query.endDate && new Date(query.endDate)) || new Date();
    const startDate =
      (query.startDate && new Date(query.startDate)) ||
      new Date(endDate.getTime() - MONTH_MS);

    if (isNaN(+startDate)) {
      throw new BadRequestException('Invalid start date');
    }

    if (isNaN(+endDate)) {
      throw new BadRequestException('Invalid end date');
    }

    const orders = await this.connection
      .getRepository(Order)
      .createQueryBuilder('order')
      .where('order.createdAt >= :startDate', { startDate })
      .andWhere('order.createdAt <= :endDate', { endDate })
      .orderBy('order.createdAt', 'ASC')
      .getMany();

    const statuses = orders.reduce((acc, { status }) => {
      return { ...acc, [status]: (acc[status] || 0) + 1 };
    }, {});

    for (const orderStatus of ORDER_STATUSES) {
      if (!statuses[orderStatus]) {
        statuses[orderStatus] = {
          count: 0,
        };
      }
    }

    return {
      statuses: Object.entries(statuses).map((status: [string, number]) => ({
        name: status[0],
        count: status[1],
      })),
    };
  }
}

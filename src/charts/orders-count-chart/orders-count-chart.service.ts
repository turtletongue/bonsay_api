import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Order } from '@orders/entities/order.entity';
import { MONTH_MS } from '@utils/variables';
import { FindOrdersCountDataDto } from './dto/find-orders-count-data.dto';

@Injectable()
export class OrdersCountChartService {
  constructor(@InjectConnection() private connection: Connection) {}

  public async get(query: FindOrdersCountDataDto) {
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

    const dates = orders.reduce((acc, order) => {
      const dateString = order.createdAt.toLocaleDateString('ru', {
        day: '2-digit',
        month: 'long',
        timeZone: 'Europe/Moscow',
      });

      return {
        ...acc,
        [dateString]: {
          count: (acc[dateString]?.count || 0) + 1,
        },
      };
    }, {});

    for (
      let date = startDate;
      date <= endDate;
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    ) {
      const dateString = date.toLocaleDateString('ru', {
        day: '2-digit',
        month: 'long',
        timeZone: 'Europe/Moscow',
      });

      if (!dates[dateString]) {
        dates[dateString] = {
          count: 0,
        };
      }
    }

    return {
      dates: Object.entries(dates).map((date: [string, { count: number }]) => ({
        date: date[0],
        count: date[1].count,
      })),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Purchase } from '@purchases/entities/purchase.entity';
import { MONTH_MS } from '@utils/variables';
import { FindRevenueDataDto } from './dto/find-revenue-data.dto';

@Injectable()
export class RevenueChartService {
  constructor(@InjectConnection() private connection: Connection) {}

  public async get(query: FindRevenueDataDto) {
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

    const purchases = await this.connection
      .getRepository(Purchase)
      .createQueryBuilder('purchase')
      .innerJoin('purchase.order', 'order')
      .innerJoinAndSelect('purchase.product', 'product')
      .where('purchase.createdAt >= :startDate', { startDate })
      .andWhere('purchase.createdAt <= :endDate', { endDate })
      .andWhere('order.status <> :status', { status: 'cancelled' })
      .orderBy('purchase.createdAt', 'ASC')
      .getMany();

    const dates = purchases.reduce((acc, purchase) => {
      const dateString = purchase.createdAt.toLocaleDateString('ru', {
        day: '2-digit',
        month: 'long',
        timeZone: 'Europe/Moscow',
      });

      return {
        ...acc,
        [dateString]: {
          sum: (acc[dateString]?.sum || 0) + +purchase.product.price,
        },
      };
    }, {});

    return {
      dates: Object.entries(dates).map((date: [string, { sum: number }]) => ({
        date: date[0],
        sum: date[1].sum,
      })),
    };
  }
}

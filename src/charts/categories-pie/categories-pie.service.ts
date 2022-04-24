import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { Purchase } from '@purchases/entities/purchase.entity';
import { Category } from '@categories/entities/category.entity';
import { MONTH_MS } from '@utils/variables';
import { FindCategoriesPieDto } from './dto/find-categories-pie-data.dto';

@Injectable()
export class CategoriesPieService {
  constructor(@InjectConnection() private connection: Connection) {}

  public async get(query: FindCategoriesPieDto) {
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
      .innerJoinAndSelect('product.category', 'category')
      .where('purchase.createdAt >= :startDate', { startDate })
      .andWhere('purchase.createdAt <= :endDate', { endDate })
      .andWhere('order.status <> :status', { status: 'cancelled' })
      .orderBy('purchase.createdAt', 'ASC')
      .getMany();

    const categories = purchases.reduce((acc, { product: { category } }) => {
      return { ...acc, [category.name]: (acc[category.name] || 0) + 1 };
    }, {});

    const allCategories = await this.connection
      .getRepository(Category)
      .createQueryBuilder('category')
      .getMany();

    for (const category of allCategories) {
      if (!categories[category.name]) {
        categories[category.name] = {
          count: 0,
        };
      }
    }

    return {
      categories: Object.entries(categories).map(
        (category: [string, number]) => ({
          name: category[0],
          count: category[1],
        }),
      ),
    };
  }
}

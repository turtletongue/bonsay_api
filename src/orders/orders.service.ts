import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

import mapQueryToFindOptions from '@utils/map-query-to-find-options';
import { Product } from '@products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrderDto } from './dto/find-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return new Promise((resolve) => {
      this.connection.transaction(async (entityManager) => {
        await Promise.all(
          createOrderDto.purchases.map(async ({ productId }) => {
            return await entityManager.save(Product, {
              id: productId,
              isAvailable: false,
            });
          }),
        );

        resolve(await entityManager.save(Order, createOrderDto));
      });
    });
  }

  public async findAll(query: FindOrderDto) {
    const findOptions = mapQueryToFindOptions(query);

    const [data, total] = await this.ordersRepository.findAndCount({
      ...findOptions,
      relations: ['purchases', 'purchases.product'],
    } as FindManyOptions<Order>);

    return {
      $limit: findOptions.take,
      $skip: findOptions.skip,
      total,
      data,
    };
  }

  public async findOne(id: number) {
    const order = await this.ordersRepository.findOne(id, {
      relations: ['purchases', 'purchases.product', 'address'],
    } as FindOneOptions<Order>);

    if (!order) {
      throw new UnprocessableEntityException('Order is not found');
    }

    return order;
  }

  public async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepository.findOne(id, {
      relations: ['purchases'],
    });

    if (!order) {
      throw new UnprocessableEntityException('Order is not found');
    }

    return new Promise((resolve) => {
      this.connection.transaction(async (entityManager) => {
        if (
          updateOrderDto.status &&
          order.status === 'cancelled' &&
          updateOrderDto.status !== 'cancelled'
        ) {
          await Promise.all(
            order.purchases.map(async ({ productId }) => {
              return await entityManager.save(Product, {
                id: productId,
                isAvailable: false,
              });
            }),
          );
        }

        if (
          updateOrderDto.status &&
          order.status !== 'cancelled' &&
          updateOrderDto.status === 'cancelled'
        ) {
          await Promise.all(
            order.purchases.map(async ({ productId }) => {
              return await entityManager.save(Product, {
                id: productId,
                isAvailable: true,
              });
            }),
          );
        }

        resolve(
          await entityManager.save(Order, {
            id,
            ...updateOrderDto,
          }),
        );
      });
    });
  }

  public async remove(id: number) {
    const order = await this.findOne(id);

    await this.ordersRepository.delete(id);

    return order;
  }
}

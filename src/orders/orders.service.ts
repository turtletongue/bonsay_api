import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import mapQueryToFindOptions from 'src/utils/map-query-to-find-options';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrderDto } from './dto/find-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  public async create(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.save(createOrderDto);
  }

  public async findAll(query: FindOrderDto) {
    const findOptions = mapQueryToFindOptions(query);

    const [data, total] = await this.ordersRepository.findAndCount(findOptions);

    return {
      $limit: findOptions.take,
      $skip: findOptions.skip,
      total,
      data,
    };
  }

  public async findOne(id: number) {
    const order = await this.ordersRepository.findOne(id);

    if (!order) {
      throw new UnprocessableEntityException('Order is not found');
    }

    return order;
  }

  public async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepository.findOne(id);

    if (!order) {
      throw new UnprocessableEntityException('Order is not found');
    }

    const updatedOrder = await this.ordersRepository.save({
      id,
      ...updateOrderDto,
    });

    return updatedOrder;
  }

  public async remove(id: number) {
    const order = await this.findOne(id);

    await this.ordersRepository.delete(id);

    return order;
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import mapQueryToFindOptions from '@utils/map-query-to-find-options';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { FindPurchaseDto } from './dto/find-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) {}

  public async create(createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesRepository.save(createPurchaseDto);
  }

  public async findAll(query: FindPurchaseDto) {
    const findOptions = mapQueryToFindOptions(query);

    const [data, total] = await this.purchasesRepository.findAndCount(
      findOptions,
    );

    return {
      $limit: findOptions.take,
      $skip: findOptions.skip,
      total,
      data,
    };
  }

  public async findOne(id: number) {
    const purchase = await this.purchasesRepository.findOne(id);

    if (!purchase) {
      throw new UnprocessableEntityException('Purchase is not found');
    }

    return purchase;
  }

  public async update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    const purchase = await this.purchasesRepository.findOne(id);

    if (!purchase) {
      throw new UnprocessableEntityException('Purchase is not found');
    }

    const updatedPurchase = await this.purchasesRepository.save({
      id,
      ...updatePurchaseDto,
    });

    return updatedPurchase;
  }

  public async remove(id: number) {
    const purchase = await this.findOne(id);

    await this.purchasesRepository.delete(id);

    return purchase;
  }
}

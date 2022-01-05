import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import mapQueryToFindOptions from 'src/utils/map-query-to-find-options';
import { CreateAddressDto } from './dto/create-address.dto';
import { FindAddressDto } from './dto/find-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address) private addressesRepository: Repository<Address>,
  ) {}

  public async create(createAddressDto: CreateAddressDto) {
    return this.addressesRepository.save(createAddressDto);
  }

  public async findAll(query: FindAddressDto) {
    const findOptions = mapQueryToFindOptions(query);

    const [data, total] = await this.addressesRepository.findAndCount(
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
    const address = await this.addressesRepository.findOne(id);

    if (!address) {
      throw new UnprocessableEntityException('Address is not found');
    }

    return address;
  }

  public async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressesRepository.findOne(id);

    if (!address) {
      throw new UnprocessableEntityException('Address is not found');
    }

    const updatedAddress = await this.addressesRepository.save({
      id,
      ...updateAddressDto,
    });

    return updatedAddress;
  }

  public async remove(id: number) {
    const address = await this.findOne(id);

    await this.addressesRepository.delete(id);

    return address;
  }
}

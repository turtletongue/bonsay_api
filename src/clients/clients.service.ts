import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import mapQueryToFindOptions from 'src/utils/map-query-to-find-options';
import { CreateClientDto } from './dto/create-client.dto';
import { FindClientDto } from './dto/find-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
  ) {}

  public async create(createClientDto: CreateClientDto) {
    return this.clientsRepository.save(createClientDto);
  }

  public async findAll(query: FindClientDto) {
    const findOptions = mapQueryToFindOptions(query);

    const [data, total] = await this.clientsRepository.findAndCount(
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
    const client = await this.clientsRepository.findOne(id);

    if (!client) {
      throw new UnprocessableEntityException('Client is not found');
    }

    return client;
  }

  public async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientsRepository.findOne(id);

    if (!client) {
      throw new UnprocessableEntityException('Client is not found');
    }

    const updatedClient = await this.clientsRepository.save({
      id,
      ...updateClientDto,
    });

    return updatedClient;
  }

  public async remove(id: number) {
    const client = await this.findOne(id);

    await this.clientsRepository.delete(id);

    return client;
  }
}

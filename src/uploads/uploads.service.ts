import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import mapQueryToFindOptions from 'src/utils/map-query-to-find-options';
import { CreateUploadDto } from './dto/create-upload.dto';
import { FindUploadDto } from './dto/find-upload.dto';
import { Upload } from './entities/upload.entity';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload) private uploadsRepository: Repository<Upload>,
  ) {}

  public async create(createUploadDto: CreateUploadDto) {
    return this.uploadsRepository.save(createUploadDto);
  }

  public async findAll(query: FindUploadDto) {
    const findOptions = mapQueryToFindOptions(query);

    const [data, total] = await this.uploadsRepository.findAndCount(
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
    const upload = await this.uploadsRepository.findOne(id);

    if (!upload) {
      throw new UnprocessableEntityException('Upload is not found');
    }

    return upload;
  }

  public async remove(id: number) {
    const upload = await this.findOne(id);

    await this.uploadsRepository.delete(id);

    return upload;
  }
}

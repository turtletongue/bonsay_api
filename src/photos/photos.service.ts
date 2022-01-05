import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import mapQueryToFindOptions from 'src/utils/map-query-to-find-options';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { FindPhotoDto } from './dto/find-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photosRepository: Repository<Photo>,
  ) {}

  public async create(createPhotoDto: CreatePhotoDto) {
    return this.photosRepository.save(createPhotoDto);
  }

  public async findAll(query: FindPhotoDto) {
    const findOptions = mapQueryToFindOptions(query);

    const [data, total] = await this.photosRepository.findAndCount(findOptions);

    return {
      $limit: findOptions.take,
      $skip: findOptions.skip,
      total,
      data,
    };
  }

  public async findOne(id: number) {
    const photo = await this.photosRepository.findOne(id);

    if (!photo) {
      throw new UnprocessableEntityException('Photo is not found');
    }

    return photo;
  }

  public async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    const photo = await this.photosRepository.findOne(id);

    if (!photo) {
      throw new UnprocessableEntityException('Photo is not found');
    }

    const updatedPhoto = await this.photosRepository.save({
      id,
      ...updatePhotoDto,
    });

    return updatedPhoto;
  }

  public async remove(id: number) {
    const photo = await this.findOne(id);

    await this.photosRepository.delete(id);

    return photo;
  }
}

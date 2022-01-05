import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import mapQueryToFindOptions from 'src/utils/map-query-to-find-options';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  public async create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.save(createCategoryDto);
  }

  public async findAll(query: FindCategoryDto) {
    const findOptions = mapQueryToFindOptions(query);

    const [data, total] = await this.categoriesRepository.findAndCount(
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
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new UnprocessableEntityException('Category is not found');
    }

    return category;
  }

  public async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne(id);

    if (!category) {
      throw new UnprocessableEntityException('Category is not found');
    }

    const updatedCategory = await this.categoriesRepository.save({
      id,
      ...updateCategoryDto,
    });

    return updatedCategory;
  }

  public async remove(id: number) {
    const category = await this.findOne(id);

    await this.categoriesRepository.delete(id);

    return category;
  }
}

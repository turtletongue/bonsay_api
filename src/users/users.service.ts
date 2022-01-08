import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';

import mapQueryToFindOptions from 'src/utils/map-query-to-find-options';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException('This email is already taken');
    }

    const salt = await genSalt();

    const hashedPassword = await hash(createUserDto.password, salt);

    const createdUser = await this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });

    delete createdUser.password;

    return createdUser;
  }

  public async findAll(query: FindUserDto) {
    const findOptions = mapQueryToFindOptions(query);

    const [data, total] = await this.usersRepository.findAndCount(findOptions);

    return {
      $limit: findOptions.take,
      $skip: findOptions.skip,
      total,
      data,
    };
  }

  public async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new UnprocessableEntityException('User is not found');
    }

    return user;
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new UnprocessableEntityException('User is not found');
    }

    const hashedPassword = updateUserDto.password
      ? await hash(updateUserDto.password, await genSalt())
      : null;

    const updatedUser = await this.usersRepository.save({
      id,
      ...updateUserDto,
      ...(hashedPassword ? { password: hashedPassword } : {}),
    });

    delete updatedUser.password;

    return updatedUser;
  }

  public async remove(id: number) {
    const user = await this.findOne(id);

    await this.usersRepository.delete(id);

    return user;
  }

  public async validateCredentials(
    userId: number,
    password: string,
  ): Promise<boolean> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .select('User.id')
      .addSelect('User.password')
      .where({
        id: userId,
      })
      .getOne();

    return compare(password, user.password);
  }
}

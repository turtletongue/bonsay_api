import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new HttpException(
        'This email is already taken.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await genSalt();

    const hashedPassword = await hash(createUserDto.password, salt);

    const createdUser = await this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
      passwordSalt: salt,
    });

    delete createdUser.password;
    delete createdUser.passwordSalt;

    return createdUser;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.usersRepository.findOne(id);

    if (!existingUser) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.usersRepository.save({
      id,
      ...updateUserDto,
    });

    delete updatedUser.password;
    delete updatedUser.passwordSalt;

    return updatedUser;
  }

  async remove(id: number) {
    const existingUser = await this.usersRepository.findOne(id);

    if (!existingUser) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.delete(id);

    return existingUser;
  }
}

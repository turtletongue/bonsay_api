import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { Roles } from 'src/utils/decorators/role.decorator';
import { JWTGuard } from 'src/authentication/jwt.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('admin')
  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JWTGuard)
  @Get()
  public async findAll(@Query() query: FindUserDto, @Req() { user }) {
    return this.usersService.findAll(
      user.role === 'admin' ? query : { ...query, id: user.id },
    );
  }

  @UseGuards(JWTGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string, @Req() { user }) {
    if (String(user.id) !== id && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.usersService.findOne(+id);
  }

  @UseGuards(JWTGuard)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() { user },
  ) {
    if (String(user.id) !== id && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.usersService.update(+id, { ...updateUserDto, role: user.role });
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string, @Req() { user }) {
    if (String(user.id) !== id && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.usersService.remove(+id);
  }
}

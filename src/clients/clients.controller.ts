import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';

import { JWTGuard } from 'src/authentication/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FindClientDto } from './dto/find-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  public async create(@Body() createClientDto: CreateClientDto) {
    const user = await this.usersService.create({
      ...createClientDto,
      role: 'client',
    });

    return this.clientsService.create({ ...createClientDto, userId: user.id });
  }

  @UseGuards(JWTGuard)
  @Get()
  public async findAll(@Query() query: FindClientDto, @Req() { user }) {
    return this.clientsService.findAll(
      user.role === 'admin' ? query : { ...query, userId: user.id },
    );
  }

  @UseGuards(JWTGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string, @Req() { user }) {
    const client = await this.clientsService.findOne(+id);

    if (user.id !== client.userId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return client;
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('client')
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Req() { user },
  ) {
    const client = await this.clientsService.findOne(+id);

    if (user.id !== client.userId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.clientsService.update(+id, {
      ...updateClientDto,
      userId: user.id,
    });
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string, @Req() { user }) {
    const client = await this.clientsService.findOne(+id);

    if (user.id !== client.userId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.clientsService.remove(+id);
  }
}

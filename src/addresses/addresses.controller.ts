import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  Query,
} from '@nestjs/common';

import { JWTGuard } from 'src/authentication/jwt.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { FindAddressDto } from './dto/find-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('client')
  @Post()
  public async create(
    @Body() createAddressDto: CreateAddressDto,
    @Req() { user },
  ) {
    return this.addressesService.create({
      ...createAddressDto,
      clientId: user.client?.id,
    });
  }

  @UseGuards(JWTGuard)
  @Get()
  public async findAll(@Query() query: FindAddressDto, @Req() { user }) {
    return this.addressesService.findAll(
      user.role === 'admin' ? query : { ...query, clientId: user.client?.id },
    );
  }

  @UseGuards(JWTGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string, @Req() { user }) {
    const address = await this.addressesService.findOne(+id);

    if (user.client?.id !== address.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return address;
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('client')
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Req() { user },
  ) {
    const address = await this.addressesService.findOne(+id);

    if (user.client?.id !== address.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.addressesService.update(+id, {
      ...updateAddressDto,
      clientId: user.client?.id,
    });
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string, @Req() { user }) {
    const address = await this.addressesService.findOne(+id);

    if (user.client?.id !== address.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.addressesService.remove(+id);
  }
}

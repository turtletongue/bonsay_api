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
  BadRequestException,
  Query,
  ForbiddenException,
} from '@nestjs/common';

import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { JWTGuard } from 'src/authentication/jwt.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { OrdersService } from 'src/orders/orders.service';
import { FindPurchaseDto } from './dto/find-purchase.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly ordersService: OrdersService,
  ) {}

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('client')
  @Post()
  public async create(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @Req() { user },
  ) {
    const order = await this.ordersService.findOne(createPurchaseDto.orderId);

    if (order.clientId !== user.client?.id) {
      throw new BadRequestException('Unknown order');
    }

    return this.purchasesService.create({
      ...createPurchaseDto,
      clientId: user.client?.id,
    });
  }

  @UseGuards(JWTGuard)
  @Get()
  public async findAll(@Query() query: FindPurchaseDto, @Req() { user }) {
    return this.purchasesService.findAll(
      user.role === 'admin' ? query : { ...query, clientId: user.client?.id },
    );
  }

  @UseGuards(JWTGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string, @Req() { user }) {
    const purchase = await this.purchasesService.findOne(+id);

    if (user.client?.id !== purchase.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return purchase;
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('client')
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
    @Req() { user },
  ) {
    const purchase = await this.purchasesService.findOne(+id);

    if (user.client?.id !== purchase.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    const order = await this.ordersService.findOne(updatePurchaseDto.orderId);

    if (order.clientId !== user.client?.id) {
      throw new BadRequestException('Unknown order');
    }

    return this.purchasesService.update(+id, {
      ...updatePurchaseDto,
      clientId: user.client?.id,
    });
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string, @Req() { user }) {
    const purchase = await this.purchasesService.findOne(+id);

    if (user.client?.id !== purchase.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.purchasesService.remove(+id);
  }
}

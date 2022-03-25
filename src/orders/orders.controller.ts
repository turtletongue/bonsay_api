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
  Query,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

import { JWTGuard } from '@authentication/jwt.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { Roles } from '@utils/decorators/role.decorator';
import { PurchasesService } from '@purchases/purchases.service';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrderDto } from './dto/find-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly purchasesService: PurchasesService,
  ) {}

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('client')
  @Post()
  public async create(@Body() createOrderDto: CreateOrderDto, @Req() { user }) {
    const order = await this.ordersService.create({
      ...createOrderDto,
      clientId: user.client?.id,
    });

    if (createOrderDto.purchases) {
      for (const purchase of createOrderDto.purchases) {
        if (!purchase.productId) {
          throw new BadRequestException('Invalid purchase productId');
        }

        await this.purchasesService.create({
          ...purchase,
          clientId: user.client?.id,
          orderId: order.id,
        });
      }
    }

    return order;
  }

  @UseGuards(JWTGuard)
  @Get()
  public async findAll(@Query() query: FindOrderDto, @Req() { user }) {
    return this.ordersService.findAll(
      user.role === 'admin' ? query : { ...query, clientId: user.client?.id },
    );
  }

  @UseGuards(JWTGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string, @Req() { user }) {
    const order = await this.ordersService.findOne(+id);

    if (user.client?.id !== order.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return order;
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('client', 'admin')
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() { user },
  ) {
    const order = await this.ordersService.findOne(+id);

    if (user.client?.id !== order.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.ordersService.update(+id, {
      ...updateOrderDto,
      clientId: user.client?.id,
    });
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string, @Req() { user }) {
    const order = await this.ordersService.findOne(+id);

    if (user.client?.id !== order.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.ordersService.remove(+id);
  }
}

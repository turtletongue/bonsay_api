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
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

import { JWTGuard } from '@authentication/jwt.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { Roles } from '@utils/decorators/role.decorator';
import { KOPECKS_IN_RUBLE } from '@utils/variables';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { FindPaymentDto } from './dto/find-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('client')
  @Post()
  public async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() { user },
  ) {
    try {
      await this.stripeClient.charges.create({
        source: createPaymentDto.tokenId,
        amount: createPaymentDto.sum * KOPECKS_IN_RUBLE,
        currency: 'RUB',
      });
    } catch (error) {
      throw new BadRequestException('Something wrong with your payment.');
    }

    return this.paymentsService.create({
      ...createPaymentDto,
      clientId: user.client?.id,
    });
  }

  @UseGuards(JWTGuard)
  @Get()
  public async findAll(@Query() query: FindPaymentDto, @Req() { user }) {
    return this.paymentsService.findAll(
      user.role === 'admin' ? query : { ...query, clientId: user.client?.id },
    );
  }

  @UseGuards(JWTGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string, @Req() { user }) {
    const payment = await this.paymentsService.findOne(+id);

    if (user.client?.id !== payment.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return payment;
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('client')
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @Req() { user },
  ) {
    const payment = await this.paymentsService.findOne(+id);

    if (user.client?.id !== payment.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.paymentsService.update(+id, {
      ...updatePaymentDto,
      clientId: user.client?.id,
      tokenId: payment.tokenId,
      sum: payment.sum,
    });
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  public async remove(@Param('id') id: string, @Req() { user }) {
    const payment = await this.paymentsService.findOne(+id);

    if (user.client?.id !== payment.clientId && user.role !== 'admin') {
      throw new ForbiddenException();
    }

    return this.paymentsService.remove(+id);
  }
}

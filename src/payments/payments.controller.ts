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
} from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { FindPaymentDto } from './dto/find-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JWTGuard } from 'src/authentication/jwt.guard';
import { RolesGuard } from 'src/utils/guards/roles.guard';
import { Roles } from 'src/utils/decorators/role.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JWTGuard, RolesGuard)
  @Roles('client')
  @Post()
  public async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() { user },
  ) {
    return this.paymentsService.create({
      ...createPaymentDto,
      clientId: user.client?.id,
      status: 'wait',
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
      status: payment.status,
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

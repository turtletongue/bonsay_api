import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { PurchasesModule } from 'src/purchases/purchases.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => PurchasesModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}

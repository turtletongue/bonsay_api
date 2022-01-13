import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Status } from 'src/declarations';
import { Client } from 'src/clients/entities/client.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 30, scale: 2 })
  sum: number;

  @ManyToOne(() => Client, (client) => client.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  client: Client;

  @Column()
  clientId: number;

  @ManyToOne(() => Order, (order) => order.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Order;

  @Column()
  orderId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

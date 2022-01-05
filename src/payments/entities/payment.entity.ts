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

  @Column({ type: 'enum', enum: ['wait', 'success', 'fail'], default: 'wait' })
  status: Status;

  @ManyToOne(() => Client, (client) => client.payments)
  client: Client;

  @Column()
  clientId: number;

  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;

  @Column()
  orderId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  update: Date;
}

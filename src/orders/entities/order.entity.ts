import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Address } from '@addresses/entities/address.entity';
import { Client } from '@clients/entities/client.entity';
import { Payment } from '@payments/entities/payment.entity';
import { Purchase } from '@purchases/entities/purchase.entity';

import { OrderStatus } from '@app/declarations';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['processing', 'delivery', 'completed', 'cancelled'],
    default: 'processing',
  })
  status: OrderStatus;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  phone: string;

  @ManyToOne(() => Address, (address) => address.orders, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  address: Address;

  @Column({ nullable: true })
  addressId: number;

  @ManyToOne(() => Client, (client) => client.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  client: Client;

  @Column()
  clientId: number;

  @OneToMany(() => Payment, (payment) => payment.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payments: Payment[];

  @OneToMany(() => Purchase, (purchase) => purchase.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  purchases: Purchase[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

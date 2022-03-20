import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@users/entities/user.entity';
import { Address } from '@addresses/entities/address.entity';
import { Order } from '@orders/entities/order.entity';
import { Payment } from '@payments/entities/payment.entity';
import { Purchase } from '@purchases/entities/purchase.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.clients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Address, (address) => address.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payments: Payment[];

  @OneToMany(() => Purchase, (purchase) => purchase.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  purchases: Purchase[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

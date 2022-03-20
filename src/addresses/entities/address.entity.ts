import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Client } from '@clients/entities/client.entity';
import { Order } from '@orders/entities/order.entity';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  house: string;

  @Column()
  postcode: string;

  @ManyToOne(() => Client, (client) => client.addresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  client: Client;

  @Column()
  clientId?: number;

  @OneToMany(() => Order, (order) => order.address, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

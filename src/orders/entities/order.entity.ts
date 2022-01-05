import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Address } from 'src/addresses/entities/address.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @ManyToOne(() => Address, (address) => address.orders)
  address: Address;

  @Column()
  addressId: number;

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  @Column()
  clientId: number;

  @OneToMany(() => Payment, (payment) => payment.orderId)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

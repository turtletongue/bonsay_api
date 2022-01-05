import { Client } from 'src/clients/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @ManyToOne(() => Client, (client) => client.addresses)
  client: Client;

  @Column()
  clientId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

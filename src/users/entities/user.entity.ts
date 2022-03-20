import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { RefreshToken } from '@authentication/entities/refresh-token.entity';
import { Role } from '@app/declarations';
import { Client } from '@clients/entities/client.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'client'], default: 'client' })
  role: Role;

  @OneToMany(() => Client, (client) => client.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  clients: Client[];

  client?: Client;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  refreshTokens: RefreshToken[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

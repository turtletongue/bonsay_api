import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { RefreshToken } from 'src/authentication/entities/refresh-token.entity';
import { Role } from 'src/declarations';
import { Client } from 'src/clients/entities/client.entity';

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

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  client?: Client;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

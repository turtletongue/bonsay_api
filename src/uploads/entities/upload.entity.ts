import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Category } from '@categories/entities/category.entity';
import { Product } from '@products/entities/product.entity';
import { Photo } from '@photos/entities/photo.entity';

@Entity({ name: 'uploads' })
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalName: string;

  @Column()
  fileName: string;

  @Column()
  path: string;

  @Column({ default: '' })
  internalPath: string;

  @Column()
  mimetype: string;

  @Column()
  size: string;

  @OneToMany(() => Product, (product) => product.upload, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  products: Product[];

  @OneToMany(() => Category, (category) => category.upload, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  categories: Category[];

  @OneToMany(() => Photo, (photo) => photo.upload, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  photos: Photo[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

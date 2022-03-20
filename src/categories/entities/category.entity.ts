import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from '@products/entities/product.entity';
import { Upload } from '@uploads/entities/upload.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @OneToMany(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: Product[];

  @ManyToOne(() => Upload, (upload) => upload.categories, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  upload: Upload;

  @Column({ nullable: true })
  uploadId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

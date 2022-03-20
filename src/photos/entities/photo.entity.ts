import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { Product } from '@products/entities/product.entity';
import { Upload } from '@uploads/entities/upload.entity';

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.photos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;

  @Column()
  productId: number;

  @ManyToOne(() => Upload, (upload) => upload.photos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  upload: Upload;

  @Column()
  uploadId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

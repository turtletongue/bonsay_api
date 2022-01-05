import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';
import { Purchase } from 'src/purchases/entities/purchase.entity';
import { Upload } from 'src/uploads/entities/upload.entity';
import { Photo } from 'src/photos/entities/photo.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 30, scale: 2 })
  price: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('int')
  height: number;

  @Column('date')
  birthdate: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @OneToMany(() => Purchase, (purchase) => purchase.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  purchases: Purchase[];

  @ManyToOne(() => Upload, (upload) => upload.products, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  upload: Upload;

  @OneToMany(() => Photo, (photo) => photo.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  photos: Photo[];

  @Column({ nullable: true })
  uploadId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

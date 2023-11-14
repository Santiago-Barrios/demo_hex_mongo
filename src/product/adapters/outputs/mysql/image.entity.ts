import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProductEntity} from "./product.entity";

@Entity({ name: 'images' })
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'text'})
  url: string;

  @ManyToOne(() => ProductEntity, product => product.images)
  product: ProductEntity
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('float')
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;
}

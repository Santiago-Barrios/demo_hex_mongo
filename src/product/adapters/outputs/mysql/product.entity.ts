import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ImageEntity} from "./image.entity";


@Entity({name: 'products'})
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('text')
    name: string;

    @Column('float')
    price: number;

    @Column({type: 'text', nullable: true})
    description: string;

    @OneToMany(() => ImageEntity, image => image.product)
    images: ImageEntity[];
}

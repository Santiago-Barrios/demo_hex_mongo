import { Module } from '@nestjs/common';
import { ProductService } from './domain/input-ports/product.service';
import { ProductController } from './adapters/inputs/product.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductTable,
  productSchema,
} from './adapters/outputs/mongoDB/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { productServiceProvider } from './domain/product.provider';
import {ProductEntity} from "./adapters/outputs/mysql/product.entity";
import {ImageEntity} from "./adapters/outputs/mysql/image.entity";
//import { ProductEntity } from './adapters/outputs/pg/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    /*MongooseModule.forFeature([
      {
        name: ProductTable.name,
        schema: productSchema,
      },
    ]),*/
    //TypeOrmModule.forFeature([ProductEntity]),
    TypeOrmModule.forFeature([ProductEntity, ImageEntity]),
  ],
  providers: [ProductService, productServiceProvider(process.env.ENVIRONMENT)],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}

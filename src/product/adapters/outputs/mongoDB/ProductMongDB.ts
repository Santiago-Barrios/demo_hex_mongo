import { Injectable } from '@nestjs/common';
import { ProductTable } from './product.entity';
import { IProductRepository } from '../../../domain/output-ports/IProductRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductModel } from 'src/product/domain/product.model';

@Injectable()
export class ProductMongoDB implements Partial<IProductRepository> {
  constructor(
    @InjectModel(ProductTable.name)
    private productModel: Model<ProductTable>,
  ) {}

  // async create(product: ProductModel): Promise<ProductModel> {
  //   return this.productModel.create(product);
  // }

  //TODO: Ver la relación en mongo

  async search(): Promise<ProductModel[]> {
    return this.productModel.find({});
  }
}

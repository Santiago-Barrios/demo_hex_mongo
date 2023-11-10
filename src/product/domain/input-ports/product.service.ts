import { Inject, Injectable } from '@nestjs/common';
import { IProductUseCase } from './IProduct.usecase';
import { ProductModel } from '../product.model';
import { IProductRepository } from '../output-ports/IProductRepository';

@Injectable()
export class ProductService implements IProductUseCase {
  constructor(
    @Inject(IProductRepository)
    private productRepository: IProductRepository,
  ) {}

  async create(name: string, price: number): Promise<ProductModel> {
    const newProduct = new ProductModel(null, name, price);
    return this.productRepository.create(newProduct);
  }

  async findAll() {
    return this.productRepository.search();
  }
}

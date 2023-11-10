import { ProductModel } from '../product.model';

export interface IProductUseCase {
  create(name: string, price: number): Promise<ProductModel>;
  findAll(): Promise<ProductModel[]>;
}

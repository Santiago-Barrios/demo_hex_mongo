import { BaseRepository } from 'src/core/domain/repository/base.repository';
import { ProductModel } from '../product.model';

export interface IProductRepository
  extends BaseRepository<ProductModel, string> {}

export const IProductRepository = Symbol('IProductRepository');

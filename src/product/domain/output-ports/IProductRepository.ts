import { BaseRepository } from 'src/core/domain/repository/base.repository';
import { ProductModel } from '../models/product.Model';

export interface IProductRepository
  extends BaseRepository<ProductModel, string> {}

export const IProductRepository = Symbol('IProductRepository');

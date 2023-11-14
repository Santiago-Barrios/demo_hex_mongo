import {BaseRepository} from 'src/core/domain/repository/base.repository';
import {ProductModel} from '../product.model';
import {Promise} from "mongoose";

export interface IProductRepository
    extends BaseRepository<ProductModel, string> {
    addImages(productId: string, images: string[]): Promise<void>
}

export const IProductRepository = Symbol('IProductRepository');

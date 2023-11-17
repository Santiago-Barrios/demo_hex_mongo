import {Inject, Injectable} from '@nestjs/common';
import {ProductServiceInterface} from './product.service.interface';
import {ProductModel} from '../product.model';
import {IProductRepository} from '../output-ports/IProductRepository';
import {Promise} from "mongoose";

@Injectable()
export class ProductService implements ProductServiceInterface {
    constructor(
        @Inject(IProductRepository)
        private productRepository: IProductRepository,
    ) {
    }

    async create(name: string, price: number): Promise<ProductModel> {
        const newProduct = new ProductModel(null, name, price);
        return this.productRepository.create(newProduct);
    }


    async findAll() {
        return this.productRepository.search();
    }
    async getById(id: string): Promise<ProductModel> {
        return this.productRepository.getById(id)
    }
}

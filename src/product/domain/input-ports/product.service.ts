import {Inject, Injectable} from '@nestjs/common';
import {ProductUsecase} from './product.usecase';
import {ProductModel} from '../product.model';
import {IProductRepository} from '../output-ports/IProductRepository';

@Injectable()
export class ProductService implements ProductUsecase {
    constructor(
        @Inject(IProductRepository)
        private productRepository: IProductRepository,
    ) {
    }

    async create(name: string, price: number, images: string[]): Promise<ProductModel> {
        const newProduct = new ProductModel(null, name, price, images);
        return this.productRepository.create(newProduct);
    }

    async findAll() {
        return this.productRepository.search();
    }

    addImages(productId: string, images: string[]): Promise<void> {
        return this.productRepository.addImages(productId, images);
    }
}

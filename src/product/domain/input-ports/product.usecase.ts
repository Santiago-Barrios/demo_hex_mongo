import {ProductModel} from '../product.model';

export interface ProductUsecase {
    create(name: string, price: number, images: string[]): Promise<ProductModel>;

    findAll(): Promise<ProductModel[]>;

    addImages(productId: string, images: string[]): Promise<void>;
}

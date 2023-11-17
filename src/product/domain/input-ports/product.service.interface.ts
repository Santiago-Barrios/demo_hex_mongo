import {ProductModel} from '../product.model';

export interface ProductServiceInterface {
    create(name: string, price: number): Promise<ProductModel>;

    findAll(): Promise<ProductModel[]>;

    getById(id: string): Promise<ProductModel>;

}

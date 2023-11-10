import { ProductInMemory } from '../adapters/outputs/memory/ProductInMemory';
//import { ProductMongoDB } from '../adapters/outputs/mongoDB/ProductMongDB';
import { ProductPGRepository } from '../adapters/outputs/pg/product-pg.repository';
import { IProductRepository } from './output-ports/IProductRepository';

export const productServiceProvider = (environment: string) => ({
  provide: IProductRepository,
  useClass: environment === 'local' ? ProductInMemory : ProductPGRepository,
  // useClass: environment === 'local' ? ProductInMemory : ProductMongoDB,
});

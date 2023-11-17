import {ProductInMemory} from '../adapters/outputs/memory/ProductInMemory';
//import { ProductMongoDB } from '../adapters/outputs/mongoDB/ProductMongDB';
import {ProductPGRepository} from '../adapters/outputs/pg/product-pg.repository';
import {IProductRepository} from './output-ports/IProductRepository';
import {ProductMysqlRepository} from "../adapters/outputs/mysql/product-mysql.repository";

export const productServiceProvider = (environment: string) => ({
    provide: IProductRepository,
    useClass: environment === 'local' ? ProductInMemory : ProductMysqlRepository
       // (environment === 'prod') ? ProductMysqlRepository : ProductPGRepository,
    // useClass: environment === 'local' ? ProductInMemory : ProductMongoDB,
});

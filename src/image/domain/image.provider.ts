import {IImageRepository} from "./output-ports/image.repository";
import {ImageMysqlRepository} from "../adapters/output/mysql/image-mysql.repository";

export const imageServiceProvider = (environment: string) => ({
    provide: IImageRepository,
    useClass: environment === 'local' ? ImageMysqlRepository : ImageMysqlRepository
       // (environment === 'prod') ? ProductMysqlRepository : ProductPGRepository,
    // useClass: environment === 'local' ? ProductInMemory : ProductMongoDB,
});

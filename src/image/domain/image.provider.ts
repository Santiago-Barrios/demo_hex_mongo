import {IImageRepository} from "./output-ports/image.repository";

export const imageServiceProvider = (environment: string) => ({
    provide: IImageRepository,
    useClass: environment === 'local' ? ProductInMemory : ProductMysqlRepository
       // (environment === 'prod') ? ProductMysqlRepository : ProductPGRepository,
    // useClass: environment === 'local' ? ProductInMemory : ProductMongoDB,
});

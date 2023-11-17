import {Module} from '@nestjs/common';
import {ImageService} from "./domain/input-ports/image.service";
import {ProductModule} from "../product/product.module";
import {imageServiceProvider} from "./domain/image.provider";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ImageEntity} from "../product/adapters/outputs/mysql/image.entity";
import {ImageController} from "./adapters/input/image.controller";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ProductModule,
        TypeOrmModule.forFeature([ImageEntity])
    ],
    controllers: [ImageController],
    providers: [ImageService, imageServiceProvider(process.env.ENVIRONMENT)],
    exports: [],
})
export class ImageModule {
}

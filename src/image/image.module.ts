import { Module } from '@nestjs/common';
import {ImageService} from "./domain/input-ports/image.service";
import {ProductService} from "../product/domain/input-ports/product.service";
import {ProductModule} from "../product/product.module";

@Module({
    imports: [ProductModule],
    controllers: [],
    providers: [ImageService],
    exports: [],
})
export class ImageModule {}

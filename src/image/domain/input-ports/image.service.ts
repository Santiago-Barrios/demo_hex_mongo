import {Promise} from "mongoose";
import {Inject} from "@nestjs/common";
import {IImageRepository} from "../output-ports/image.repository";
import {IImageService} from "./image.service.interface";
import {ProductService} from "../../../product/domain/input-ports/product.service";

export class ImageService implements IImageService {
    constructor(
        @Inject(IImageRepository)
        private imageRepository: IImageRepository,
        private productService: ProductService
    ) {
    }

    create(url: string, productId: string): Promise<void> {
        this.productService.
        this.imageRepository.create()
    }

}
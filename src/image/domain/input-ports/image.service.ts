import {Promise} from "mongoose";
import {Inject, Injectable} from "@nestjs/common";
import {IImageRepository} from "../output-ports/image.repository";
import {IImageService} from "./image.service.interface";
import {ProductService} from "../../../product/domain/input-ports/product.service";
import {ImageModel} from "../image.model";

@Injectable()
export class ImageService implements IImageService {
    constructor(
        @Inject(IImageRepository)
        private imageRepository: IImageRepository,
        private productService: ProductService
    ) {
    }

    async create(url: string, productId: string): Promise<ImageModel> {
        const product = await this.productService.getById(productId)
        const image = new ImageModel(null, url, product)
        return await this.imageRepository.create(image)
    }

}
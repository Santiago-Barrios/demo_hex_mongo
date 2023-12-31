import {Body, Controller, Inject, Post} from "@nestjs/common";
import {ImageService} from "../../domain/input-ports/image.service";
import {IImageService} from "../../domain/input-ports/image.service.interface";
import {CreateImagesDto} from "./dtos/create-images.dto";
import {ImageModel} from "../../domain/image.model";

@Controller('images')
export class ImageController {
    constructor(
        @Inject(ImageService)
        private readonly imageService: IImageService
    ) {
    }

    @Post()
    create(@Body() createImagesDTO: CreateImagesDto): Promise<ImageModel> {
        return this.imageService.create(createImagesDTO.url, createImagesDTO.productId);
    }

}
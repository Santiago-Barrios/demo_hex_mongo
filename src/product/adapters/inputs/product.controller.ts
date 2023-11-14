import {Controller, Get, Post, Body, Inject, Param, ParseUUIDPipe} from '@nestjs/common';
import {ProductService} from '../../domain/input-ports/product.service';
import {CreateProductDto} from './dtos/create-product.dto';
import {IProductUseCase} from 'src/product/domain/input-ports/IProduct.usecase';
import {CreateImagesDto} from "./dtos/create-images.dto";

@Controller('products')
export class ProductController {
    constructor(
        @Inject(ProductService)
        private readonly productService: IProductUseCase,
    ) {
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(
            createProductDto.name,
            createProductDto.price,
        );
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Post(':id/images/')
    addImages(@Param('id', ParseUUIDPipe) id: string, @Body() createImagesDTO: CreateImagesDto) {
        return this.productService.addImages(id, createImagesDTO.images);
    }
}

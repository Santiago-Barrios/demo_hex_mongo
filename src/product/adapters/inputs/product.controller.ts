import {Controller, Get, Post, Body, Inject, Param, ParseUUIDPipe} from '@nestjs/common';
import {ProductService} from '../../domain/input-ports/product.service';
import {CreateProductDto} from './dtos/create-product.dto';
import {ProductServiceInterface} from 'src/product/domain/input-ports/product.service.interface';
import {CreateImagesDto} from "./dtos/create-images.dto";

@Controller('products')
export class ProductController {
    constructor(
        @Inject(ProductService)
        private readonly productService: ProductServiceInterface,
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
}

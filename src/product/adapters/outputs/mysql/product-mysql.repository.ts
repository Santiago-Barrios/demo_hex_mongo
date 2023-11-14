import {IProductRepository} from "../../../domain/output-ports/IProductRepository";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProductEntity} from "./product.entity";
import {ProductModel} from "../../../domain/product.model";
import {IUbitsFilter} from "../../../../core/utils";
import {NotFoundException} from "@nestjs/common";
import {Promise, Schema} from "mongoose";
import {ImageEntity} from "./image.entity";

export class ProductMysqlRepository implements IProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) {
    }

    async create(entity: ProductModel): Promise<ProductModel> {
        return this.productRepository.save(entity);
    }

    async deleteById(id: string): Promise<void> {
        const product = await this.getById(id)
        await this.productRepository.delete({id: product.id});
    }

    async getById(id: string): Promise<ProductModel | undefined> {
        const product = await this.productRepository.findOneBy({id});
        if (!product) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
        return new ProductModel(product.id, product.name, product.price);
    }

    inputFormat(data: any, args?: any): ProductModel {
        return undefined;
    }

    outputFormat(data: any, args?: any): any {
    }

    async search(options?: IUbitsFilter): Promise<ProductModel[]> {
        const products = await this.productRepository.find();
        return products.map((productEntity) => {
            return new ProductModel(productEntity.id, productEntity.name, productEntity.price);
        })
    }

    async update(id: string, updatedEntity: ProductModel): Promise<ProductModel | undefined> {
        await this.productRepository.update({id}, updatedEntity)
        return updatedEntity;
    }

    async addImages(productId: string, images: string[]): Promise<void> {
        const imagesEntities = images.map((imageUrl) => {
            const imageEntity = new ImageEntity()
            imageEntity.url = imageUrl
            return imageEntity
        })
        await this.productRepository.update({id: productId}, {images: imagesEntities})
    }
}
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
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>
    ) {
    }

    async getById(id: string): Promise<ProductModel | undefined> {
        const productEntity = await this._getById(id)
        return this._outputFormat(productEntity)
    }

    /*TODO: Está bien tener este método privado? sirve para conservar el modelo, mientras que se maneja la entidad dentro
    *  del repo*/
    private async _getById(id: string) {
        const product = await this.productRepository.findOneBy({id});
        if (!product) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
        return product
    }

    async create(productModel: ProductModel): Promise<ProductModel> {
        const productEntity = await this.productRepository.save({name: productModel.name, price: productModel.price});

        if (productModel.images) {
            const images = await this._addImages(productEntity, productModel.images);
            productEntity.images = images
        }
        return this._outputFormat(productEntity)
    }

    private async _addImages(productEntity: ProductEntity, images: string[]) {
        const imagesEntities = []
        for (const imageUrl of images) {
            const imageEntity = await this.imageRepository.save({
                url: imageUrl,
                product: productEntity
            })
            imagesEntities.push(imageEntity)
        }
        return imagesEntities
    }

    async addImages(productId: string, images: string[]): Promise<void> {
        const product = await this._getById(productId);
        await this._addImages(product, images)
    }

    async deleteById(id: string): Promise<void> {
        const product = await this.getById(id)
        await this.productRepository.delete({id: product.id});
    }

    inputFormat(data: any, args?: any): ProductModel {
        return undefined;
    }

    private _outputFormat(data: ProductEntity): ProductModel {
        const images = data.images.map((imageEntity) => imageEntity.url);
        return new ProductModel(data.id, data.name, data.price, images);
    }

    outputFormat(data: any, args?: any): any {
    }

    async search(options?: IUbitsFilter): Promise<ProductModel[]> {
        const products = await this.productRepository.find();
        return products.map((productEntity) => {
            const images = productEntity.images.map((imageEntity) => imageEntity.url);
            return new ProductModel(productEntity.id, productEntity.name, productEntity.price, images);
        })
    }

    update(id: string, updatedEntity: ProductModel): Promise<ProductModel | undefined> {
        return Promise.resolve(undefined);
    }


}
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
        return this._outputFormat(productEntity)
    }

    async deleteById(id: string): Promise<void> {
        const product = await this.getById(id)
        await this.productRepository.delete({id: product.id});
    }

    inputFormat(data: any, args?: any): ProductModel {
        return undefined;
    }

    private _outputFormat(data: ProductEntity): ProductModel {
        return new ProductModel(data.id, data.name, data.price);
    }

    outputFormat(data: any, args?: any): any {
    }

    async search(options?: IUbitsFilter): Promise<ProductModel[]> {
        const products = await this.productRepository.find();
        return products.map((product) => this._outputFormat(product));
    }

    update(id: string, updatedEntity: ProductModel): Promise<ProductModel | undefined> {
        return Promise.resolve(undefined);
    }


}
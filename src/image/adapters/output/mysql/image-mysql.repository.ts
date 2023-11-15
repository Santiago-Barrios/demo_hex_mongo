import {IImageRepository} from "../../../domain/output-ports/image.repository";
import {ImageModel} from "../../../domain/image.model";
import {Promise} from "mongoose";
import {IUbitsFilter} from "../../../../core/utils";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ImageEntity} from "./image.entity";

export class ImageMysqlRepository implements IImageRepository {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
        )
    {
    }

    async create(entity: ImageModel): Promise<ImageModel> {
        return this.imageRepository.save(entity)
    }

    deleteById(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getById(id: string): Promise<ImageModel | undefined> {
        return Promise.resolve(undefined);
    }

    inputFormat(data: any, args?: any): ImageModel {
        return undefined;
    }

    outputFormat(data: any, args?: any): any {
    }

    search(options?: IUbitsFilter): Promise<ImageModel[]> {
        return Promise.resolve([]);
    }

    update(id: string, updatedEntity: ImageModel): Promise<ImageModel | undefined> {
        return Promise.resolve(undefined);
    }

}
import {BaseRepository} from 'src/core/domain/repository/base.repository';
import {ImageModel} from "../image.model";

export interface IImageRepository
    extends BaseRepository<ImageModel, string> {
}

//TODO: Porque se exporta como simbolo?
export const IImageRepository = Symbol('IProductRepository');

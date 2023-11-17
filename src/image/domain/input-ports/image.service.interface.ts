import {ImageModel} from "../image.model";

export interface IImageService {
    create(url: string, productId: string): Promise<ImageModel>;
}
import {ImageModule} from "../image.module";
import {ImageModel} from "./image.model";
import {productMockedData} from "../../product/domain/product.data";

export const imageMockedData: ImageModel[] = [
    new ImageModel(null, 'https://google.com', productMockedData[0]),
]
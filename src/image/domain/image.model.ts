import {randomUUID} from "crypto";
import {ProductModel} from "../../product/domain/product.model";

export class ImageModel {

    constructor(
        public id: string | null = null,
        public url: string,
        public product: ProductModel
    ) {
        this.id = this.id || randomUUID();
    }

    setProduct(product: ProductModel) {
        this.product = product;
    }

    getProduct() {
        return this.product
    }

}
import { randomUUID } from 'crypto';
//import { injectProperties } from 'src/core/domain/model/inject-properties';

export class ProductModel {
  constructor(
    public id: string | null = null,
    public name: string,
    public price: number,
  ) {
    this.id = this.id || randomUUID();
  }
}

// export class ProductModel {
//   public id: string | null;
//   public name: string;
//   public price: number;
//   // constructor(
//   // ) {
//   //   this.id = this.id || randomUUID();
//   // }

//   constructor(init: Partial<ProductModel> = {}) {
//     console.log({ init });

//     injectProperties<ProductModel>(this, init);
//   }
// }

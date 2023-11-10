import { Injectable } from '@nestjs/common';
import { ProductModel } from '../../../domain/product.model';
import { MemoryRepository } from 'src/core/domain/repository/memory.repository';
import { productMockedData } from 'src/product/domain/product.data';

/**
 * This is the implementation of output port, to store things in memory.
 */
@Injectable()
export class ProductInMemory extends MemoryRepository<ProductModel> {
  constructor() {
    super(productMockedData);
  }
}

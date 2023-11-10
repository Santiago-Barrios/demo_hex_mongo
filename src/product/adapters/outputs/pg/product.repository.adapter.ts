import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as isUUID } from 'uuid';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BaseRepository } from 'src/core/domain/repository/base.repository';
import { ProductModel } from 'src/product/domain/models/product.Model';
import { IUbitsFilter } from 'src/core/utils';

@Injectable()
export class ProductRepositoryAdapter
  implements BaseRepository<ProductModel, string>
{
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async getById(id: string): Promise<ProductModel> {
    let product: ProductEntity;

    if (isUUID(id)) {
      product = await this.productRepository.findOneBy({ id });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: id.toUpperCase(),
          slug: id.toLowerCase(),
        })
        .getOne();
    }

    if (!product) throw new NotFoundException(`Product with ${id} not found`);

    return product as unknown as ProductModel;
  }
  async search(options?: IUbitsFilter): Promise<ProductModel[]> {
    const { pageFrom, pageTo } = options;

    const offset = pageFrom;

    const products = await this.productRepository.find({
      take: pageTo,
      skip: offset,
    });

    return products as unknown as ProductModel[];
  }

  async create(value: ProductModel): Promise<any> {
    try {
      const product = this.productRepository.create(value);
      await this.productRepository.save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }

    throw new Error('Method not implemented.');
  }
  async update(id: string, value: ProductModel): Promise<any> {
    const product = await this.productRepository.preload({
      id,
      ...value,
    });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      //await this.productRepository.save(product);
      return this.getById(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleDBExceptions(error);
    }
  }
  async deleteById(id: string): Promise<void> {
    const product = await this.getById(id);
    await this.productRepository.delete(product);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error?.detail);
    }

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unespected error, check server logs !!',
    );
  }

  inputFormat(data: any, args?: any): ProductModel {
    console.log({ data, args });
    return new ProductModel(null, 'name', 3000);
  }
  outputFormat(data: any, args?: any) {
    console.log({ data, args });
  }
}

import { IUbitsFilter } from '../../utils';

export interface BaseRepository<T, ID> {
  getById(id: ID): Promise<T | undefined>;
  search(options?: IUbitsFilter): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(id: ID, updatedEntity: T): Promise<T | undefined>;
  deleteById(id: ID): Promise<void>;

  inputFormat(data: any, args?: any): T;
  outputFormat(data: any, args?: any): any;
}

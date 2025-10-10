import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { IPaginatedResult } from './paginated-result.interface';

export interface IBaseRepository<T> {
  // Create
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  save(entity: T): Promise<T>;
  saveMany(entities: T[]): Promise<T[]>;

  // Read
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findOne(options: FindOneOptions<T>): Promise<T | null>;
  findById(id: number | string): Promise<T | null>;
  findByIdOrFail(id: number | string): Promise<T>;
  findByIds(ids: (number | string)[]): Promise<T[]>;
  findWithPagination(
    page: number,
    limit: number,
    options?: FindManyOptions<T>,
  ): Promise<IPaginatedResult<T>>;
  count(options?: FindManyOptions<T>): Promise<number>;
  exists(options: FindOptionsWhere<T>): Promise<boolean>;

  // Update
  update(id: number | string, data: DeepPartial<T>): Promise<T>;
  updateMany(
    criteria: FindOptionsWhere<T>,
    data: DeepPartial<T>,
  ): Promise<number>;

  // Delete
  delete(id: number | string): Promise<boolean>;
  deleteMany(criteria: FindOptionsWhere<T>): Promise<number>;
  softDelete(id: number | string): Promise<boolean>;
  restore(id: number | string): Promise<boolean>;
}

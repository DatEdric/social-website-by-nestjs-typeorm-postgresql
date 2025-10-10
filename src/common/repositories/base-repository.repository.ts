import {
  Repository,
  FindOptionsWhere,
  FindManyOptions,
  FindOneOptions,
  DeepPartial,
  ObjectLiteral,
} from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { IPaginatedResult } from '../interfaces/paginated-result.interface';
import { IBaseRepository } from '../interfaces/base-repository.interface';

export abstract class BaseRepository<T extends ObjectLiteral>
  implements IBaseRepository<T>
{
  protected constructor(protected readonly repository: Repository<T>) {}

  // Create
  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }
  createMany(data: DeepPartial<T>[]): T[] {
    return this.repository.create(data);
  }

  async save(entity: T): Promise<T> {
    try {
      return await this.repository.save(entity);
    } catch (error) {
      throw new BadRequestException(`Failed to save entity: ${error}`);
    }
  }

  async saveMany(entities: T[]): Promise<T[]> {
    try {
      return await this.repository.save(entities);
    } catch (error) {
      throw new BadRequestException(`Failed to save entities: ${error}`);
    }
  }
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async findById(id: number | string): Promise<T | null> {
    return await this.repository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  async findByIdOrFail(id: number | string): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async findByIds(ids: (number | string)[]): Promise<T[]> {
    return await this.repository.findByIds(ids as any);
  }

  async findOneByCondition(condition: FindOptionsWhere<T>): Promise<T | null> {
    return await this.repository.findOne({ where: condition });
  }

  async findManyByCondition(condition: FindOptionsWhere<T>): Promise<T[]> {
    return await this.repository.find({ where: condition });
  }

  async findWithPagination(
    page: number = 1,
    limit: number = 10,
    options?: FindManyOptions<T>,
  ): Promise<IPaginatedResult<T>> {
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    if (limit > 100) limit = 100;

    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      ...options,
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return await this.repository.count(options);
  }

  async exists(condition: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.repository.count({ where: condition });
    return count > 0;
  }

  async update(id: number | string, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findByIdOrFail(id);
    Object.assign(entity, data);
    return await this.save(entity);
  }

  async updateMany(
    criteria: FindOptionsWhere<T>,
    data: DeepPartial<T>,
  ): Promise<number> {
    const result = await this.repository.update(criteria, data as any);
    return result.affected || 0;
  }

  async upsert(
    criteria: FindOptionsWhere<T>,
    data: DeepPartial<T>,
  ): Promise<T> {
    const existing = await this.findOneByCondition(criteria);
    if (existing) {
      Object.assign(existing, data);
      return await this.save(existing);
    }
    const newEntity = this.create(data);
    return await this.save(newEntity);
  }

  async delete(id: number | string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected || 0) > 0;
  }

  async deleteMany(criteria: FindOptionsWhere<T>): Promise<number> {
    const result = await this.repository.delete(criteria);
    return result.affected || 0;
  }

  async softDelete(id: number | string): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    return (result.affected || 0) > 0;
  }

  async restore(id: number | string): Promise<boolean> {
    const result = await this.repository.restore(id);
    return (result.affected || 0) > 0;
  }
}

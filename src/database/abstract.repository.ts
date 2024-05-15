import { AbstractEntity } from './abstract.entity';
import { Entity, EntityManager, EntityTarget, FindManyOptions, FindOneOptions, Repository } from 'typeorm';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected constructor(
    private readonly repository: Repository<T>,
  ) {}

  async create(entity: EntityTarget<T>,data: T): Promise<T> {
    try {
      return await this.repository.manager.create(entity);
    } catch (error) {
      console.error('Error creating entity', error);
      throw error;
    }
  }

  async find(entity: EntityTarget<T>,options: FindManyOptions<T>): Promise<T[]> {
    try {
      return await this.repository.manager.find(entity, options);
    } catch (error) {
      console.error('Error finding entities', error);
      throw error;
    }
  }

  async findOne(entity: EntityTarget<T>,options?: FindOneOptions<T>): Promise<T | null> {
    try {
      return await this.repository.manager.findOne(entity, options);
    } catch (error) {
      console.error('Error finding one entity', error);
      throw error;
    }
  }

  async update(entity: EntityTarget<T>, filters: object, data: object): Promise<T> {
    try {
      await this.repository.manager.update(entity, filters, data);
      const updatedEntity = await this.repository.findOne(filters);
      if (!updatedEntity) {
        throw new Error('Entity not found');
      }
      return updatedEntity;
    } catch (error) {
      console.error('Error updating entity', error);
      throw error;
    }
  }

  async remove(entity: EntityTarget<T>,id: number): Promise<void> {
    try {
      await this.repository.manager.remove(id);

    } catch (error) {
      console.error('Error deleting entity', error);
      throw error;
    }
  }
}
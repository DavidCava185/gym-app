import { AbstractEntity } from './abstract.entity';
import { EntityManager, FindManyOptions, Repository } from "typeorm";

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
    protected constructor(
        private readonly repository: Repository<T>,
        private readonly entityManager: EntityManager,
    ) {}

    async create(entity: T): Promise<T> {
        const newEntity = this.repository.create(entity);
        return this.entityManager.save(newEntity);
    }

    async find(options: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
    }
}
import { Inject, Injectable } from "@nestjs/common";
import { AbstractRepository } from "src/database/abstract.repository";
import { EntityManager, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
    constructor(
        @InjectRepository(User)
        usersRepository: Repository<User>,
        entityManager: EntityManager,
    ) {
    super(usersRepository, entityManager);
    }

    async createUser(data: object): Promise<User> {
        let user: User;
        let userToCreate: any;

        userToCreate = {
            ...data,
            createdAt: new Date(),
        }

        user = await this.create(User, userToCreate);

        return user;
    }

    async findUser(filters: object): Promise<User> {
        let user: User;

        user = await this.findOne(User, filters);

        return user;
    }

    async findAllUsers(filters: object): Promise<User[]> {
        let users: User[];

        users = await this.find(User, filters);

        return users;
    }

    async updateUser(filters: object, data: object): Promise<User> {
        let user: User;

        user = await this.update(User, filters, data);

        return user;
    }

    async removeUser(id: number): Promise<void> {

        await this.remove(User, id);
    }
}


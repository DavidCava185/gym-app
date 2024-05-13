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
}
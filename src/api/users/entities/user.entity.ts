import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique } from "typeorm";

@Entity()
export class User extends AbstractEntity<User> {
    @Column()  
    name: string;

    @Column()  
    surname: string;

    @Column()
    @Unique(['email'])
    email: string;

    @Column()
    createdAt: Date;
}

import { ActivityUser } from "src/api/activities/entities/activity-user.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique, OneToMany } from "typeorm";

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

    @OneToMany(() => ActivityUser, (activityUser) => activityUser.users)
    public activityUser: ActivityUser[]
}

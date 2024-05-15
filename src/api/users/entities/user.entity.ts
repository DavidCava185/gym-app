import { Activity } from "src/api/activities/entities/activity.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";

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
    password: string;

    @Column()
    createdAt: Date;

    @ManyToMany(() => Activity)
    @JoinTable({
        name: "activity_user",
        joinColumn: {
            name: "activity",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user",
            referencedColumnName: "id"
        },
    })
    public activities?: Activity[];
}

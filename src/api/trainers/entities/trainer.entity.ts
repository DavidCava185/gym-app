import { Activity } from "src/api/activities/entities/activity.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Trainer extends AbstractEntity<Trainer> {
    @Column()  
    name: string;

    @Column()  
    surname: string;

    @Column()
    @Unique(['email'])
    email: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    password: string;

    @ManyToMany(() => Activity, activity => activity.trainers, { cascade: true })
    @JoinTable()
    public activities?: Activity[];
}

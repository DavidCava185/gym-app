import { ActivityTrainer } from "src/api/activities/entities/activity-trainer.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Trainer extends AbstractEntity<Trainer> {
    @Column()  
    name: string;

    @Column()  
    surname: string;

    @Column()
    phone: string;

    @Column()
    email: string;
   
    @Column()
    address: string;

    @OneToMany(() => ActivityTrainer, (activityTrainer) => activityTrainer.trainers)
    public activityTrainer: ActivityTrainer[]
}
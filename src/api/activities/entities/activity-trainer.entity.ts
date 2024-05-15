import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique, ManyToOne } from "typeorm";
import { Activity } from "./activity.entity";
import { Trainer } from "src/api/trainers/entities/trainer.entity";

@Entity()
export class ActivityTrainer extends AbstractEntity<ActivityTrainer> {
    @Column()  
    activityId: number;

    @Column()  
    trainerId: number;

    @ManyToOne(() => Trainer, (trainer) => trainer.activityTrainer)
    public trainers: Trainer[];
   
    @ManyToOne(() => Activity, (trainer) => trainer.activityTrainer)
    public activity: Activity [];
}
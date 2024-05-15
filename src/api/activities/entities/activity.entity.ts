import { Trainer } from "src/api/trainers/entities/trainer.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique, ManyToMany, OneToMany, ManyToOne } from "typeorm";
import { ActivityTrainer } from "./activity-trainer.entity";
import { ActivityUser } from "./activity-user.entity";
import { ActivityType } from "src/api/activity-type/entities/activity-type.entity";
import { Room } from 'src/api/rooms/entities/room.entity';

@Entity()
export class Activity extends AbstractEntity<Activity> {
    @Column()  
    name: string;

    @Column()  
    estimatedDuration: string;

    @Column()
    description: string;

    @Column()
    startDatetime: Date;
   
    @Column()
    finishDatetime: Date;

    @Column()
    activityTypeId: number;

    @Column()
    roomId: number;

    @OneToMany(() => ActivityTrainer, (activityTrainer) => activityTrainer.trainers)
    public activityTrainer: ActivityTrainer[]

    @OneToMany(() => ActivityUser, (activityUser) => activityUser.users)
    public activityUser: ActivityUser[]

    @ManyToOne(() => ActivityType, (activityType) => activityType.activities)
    public type: ActivityType

    @ManyToOne(() => Room, (room) => room.activities)
    public room: Room
}
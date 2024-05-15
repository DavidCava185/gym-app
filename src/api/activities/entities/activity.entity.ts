import { ActivityType } from "src/api/activity-types/entities/activity-type.entity";
import { Room } from "src/api/rooms/entities/room.entity";
import { Trainer } from "src/api/trainers/entities/trainer.entity";
import { User } from "src/api/users/entities/user.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";

@Entity()
export class Activity extends AbstractEntity<Activity> {
    @Column()  
    name: string;

    @Column()  
    description: string;

    @Column()  
    estimatedDuration: string;

    @Column()  
    startDatetime: Date;

    @Column()
    finishDatetime: Date;

    @ManyToOne(() => Room, (room) => room.activities)
    room: Room;

    @ManyToOne(() => ActivityType, (activityType) => activityType.activities)
    activityType: ActivityType;

    @ManyToMany(() => Trainer, trainer => trainer.activities)
    trainers: Trainer[];

    @ManyToMany(() => User, user => user.activities)
    users: User[];
}

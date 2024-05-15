import { User } from "src/api/users/entities/user.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique, ManyToOne } from "typeorm";
import { Activity } from "./activity.entity";

@Entity()
export class ActivityUser extends AbstractEntity<ActivityUser> {

    @Column()
    activityId: number;

    @Column()
    trainerId: number;

    @ManyToOne(() => User, (user) => user.activityUser)
    public users: User[];
   
    @ManyToOne(() => Activity, (activity) => activity.activityUser)
    public activities: Activity [];
}
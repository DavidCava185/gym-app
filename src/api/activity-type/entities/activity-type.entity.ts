import { Activity } from "src/api/activities/entities/activity.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique, OneToMany } from "typeorm";

@Entity()
export class ActivityType extends AbstractEntity<ActivityType> {
    @Column()  
    name: string;

    @Column()
    description: string;

    @Column()
    maxUsers: number;

    @OneToMany(() => Activity, (activity) => activity.type)
    public activities: Activity[]
}
import { Activity } from "src/api/activities/entities/activity.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Unique, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Room extends AbstractEntity<Room> {
    @Column()  
    name: string;

    @Column()  
    description?: string;

    @OneToMany(() => Activity, (activity) => activity.room)
    activities: Activity[];
}

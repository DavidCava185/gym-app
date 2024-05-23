import { UsersService } from './../users/users.service';
import { TrainersService } from './../trainers/trainers.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { RoomsService } from '../rooms/rooms.service';
import { ActivityTypesService } from '../activity-types/activity-types.service';
import { InscribeActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
    private roomsService: RoomsService,
    private activityTypesService: ActivityTypesService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(createActivityDto: any): Promise<Activity> {
    
    if (createActivityDto) {
      createActivityDto.createdAt = new Date();
    }

    if (!!createActivityDto.roomId) {
      const room = await this.roomsService.findOne({
        where: {
          id: createActivityDto.roomId,
        }
      });
      delete createActivityDto.roomId;
      createActivityDto.room = room;
    }


    if (!!createActivityDto.activityTypeId) {
      const activityType = await this.activityTypesService.findOne({
      where: {
        id: createActivityDto.activityTypeId
      }});
      delete createActivityDto.activityTypeId;
      createActivityDto.activityType = activityType;
    }
    
    const activity: any = this.activitiesRepository.create(createActivityDto);
    
    return this.activitiesRepository.save(activity);
  }

  findAll(filters?: object): Promise<Activity[]> {
    return this.activitiesRepository.find({
      relations: {
        room: true,
        activityType: true,
        trainers: true,
        users: true,
      },
      where: filters,
      order: {
        startDatetime: 'DESC',
      }
    });
  }

  findOne(filters?: FindOneOptions): Promise<Activity> {
    let findOneFilters: FindOneOptions;

    if (!filters.where) {
      findOneFilters =  {
        where: {
          ...filters,
        },
      }
    } else {
      findOneFilters = filters
    }

    findOneFilters.relations = {
      room: true,
      activityType: true,
      trainers: true,
      users: true,
    };


    return this.activitiesRepository.findOne(findOneFilters);
  }

  async update(id: number, filters: FindOneOptions, updateActivityDto: any): Promise<void> {
    if (!!updateActivityDto.roomId) {
      const room = await this.roomsService.findOne({
        where: {
          id: updateActivityDto.roomId,
        }
      });
      delete updateActivityDto.roomId;
      updateActivityDto.room = room;
    }


    if (!!updateActivityDto.activityTypeId) {
      const activityType = await this.activityTypesService.findOne({
        where: {
          id: updateActivityDto.activityTypeId
        }});
      delete updateActivityDto.activityTypeId;
      updateActivityDto.activityType = activityType;
    }

    await this.activitiesRepository.update(id, updateActivityDto);
  }

  async remove(id: number): Promise<void> {
    await this.activitiesRepository.delete(id);
  }

  async relateToUser(activityId: number, userId: number): Promise<Activity> {
    const activity = await this.findOne({where: {id: activityId}});

    const user = await this.usersService.findOne({where: {id: userId}});

    activity.users.push(user);

    return this.activitiesRepository.save(activity);
  }
}

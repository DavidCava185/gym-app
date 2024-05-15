import { UsersService } from './../users/users.service';
import { TrainersService } from './../trainers/trainers.service';
import { Injectable } from '@nestjs/common';
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
  ) {}

  async create(createActivityDto: any): Promise<Activity[]> {
    
    if (createActivityDto) {
      createActivityDto.createdAt = new Date();
    }

    const room = await this.roomsService.findOne(createActivityDto.roomId);
    delete createActivityDto.roomId;
    createActivityDto.room = room;

    const activityType = await this.activityTypesService.findOne(createActivityDto.activityTypeId);
    delete createActivityDto.activityTypeId;
    createActivityDto.activityType = activityType;
    
    const activity = this.activitiesRepository.create(createActivityDto);
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
    this.activitiesRepository.update(id, updateActivityDto);
  }

  async remove(id: number): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}

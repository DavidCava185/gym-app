import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { ActivityType } from './entities/activity-type.entity';

@Injectable()
export class ActivityTypesService {
  constructor(
    @InjectRepository(ActivityType)
    private activityTypesRepository: Repository<ActivityType>,
  ) {}

  create(createActivityTypeDto: any): Promise<ActivityType[]> {
    const activityType = this.activityTypesRepository.create(createActivityTypeDto);
    return this.activityTypesRepository.save(activityType);
  }

  findAll(): Promise<ActivityType[]> {
    return this.activityTypesRepository.find();
  }

  findOne(filters?: FindOneOptions): Promise<ActivityType> {
    let findOneFilters: FindOneOptions;

    if (!filters?.where) {
      findOneFilters =  {
        where: {
          ...filters,
        },
      }
    } else {
      findOneFilters = filters
    }


    return this.activityTypesRepository.findOneOrFail(findOneFilters);
  }

  async update(id: number, filters: FindOneOptions, updateActivityTypeDto: any): Promise<void> {
    this.activityTypesRepository.update(id, updateActivityTypeDto);
  }

  async remove(id: number): Promise<void> {
    await this.activityTypesRepository.delete(id);
  }
}

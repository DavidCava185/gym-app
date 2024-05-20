import { ActivitiesService } from './../activities/activities.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { Trainer } from './entities/trainer.entity';
import { AssignTrainerActivitiesDto } from './dto/assign-trainer-activity.dto';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainer)
    private trainersRepository: Repository<Trainer>,
    private activitiesService: ActivitiesService,
  ) {}

  create(createTrainerDto: any): Promise<Trainer[]> {
    const trainer = this.trainersRepository.create(createTrainerDto);
    return this.trainersRepository.save(trainer);
  }

  findAll(filters?: object): Promise<Trainer[]> {
    return this.trainersRepository.find({
      relations: {
        activities: true,
      },
      where: filters,
    });
  }

  findOne(filters?: FindOneOptions): Promise<Trainer> {
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
      activities: true,
    }


    return this.trainersRepository.findOne(findOneFilters);
  }

  async update(id: number, filters: FindOneOptions, updateTrainerDto: any): Promise<void> {
    this.trainersRepository.update(id, updateTrainerDto);
  }

  async remove(id: number): Promise<void> {
    await this.trainersRepository.delete(id);
  }

  async assignActivities(id: number, assignTrainerActivitiesDto: AssignTrainerActivitiesDto) {
    const trainer: Trainer = await this.findOne({
      where: {
        id,
      }
    });
    const activities: any[] = await this.activitiesService.findAll({
      id: In(assignTrainerActivitiesDto.activityIds),
    });
    trainer.activities = activities;
    await this.trainersRepository.save(trainer);
  }
}

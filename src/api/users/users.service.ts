import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ActivitiesService } from '../activities/activities.service';
import { AssignUserActivitiesDto } from './dto/assign-user-activity.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private activitiesService: ActivitiesService,
  ) {}

  create(createUserDto: any): Promise<User[]> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(filters?: FindOneOptions): Promise<User> {
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


    return this.usersRepository.findOne(findOneFilters);
  }

  async update(id: number, filters: FindOneOptions, updateUserDto: any): Promise<void> {
    await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async assignActivities(id: number, assignUserActivitiesDto: AssignUserActivitiesDto) {
    const user: User = await this.findOne({
      where: {
        id,
      }
    });
    const activities: any[] = await this.activitiesService.findAll({
      id: assignUserActivitiesDto.activityIds,
    });
    user.activities = activities;


    await this.usersRepository.save(user);
  }
}

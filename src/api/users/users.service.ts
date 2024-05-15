import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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


    return this.usersRepository.findOneOrFail(findOneFilters);
  }

  async update(id: number, filters: FindOneOptions, updateUserDto: any): Promise<void> {
    this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

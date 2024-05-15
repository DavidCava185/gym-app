import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  create(createRoomDto: any): Promise<Room[]> {
    const room = this.roomsRepository.create(createRoomDto);
    return this.roomsRepository.save(room);
  }

  findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }

  findOne(filters?: FindOneOptions): Promise<Room> {
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


    return this.roomsRepository.findOneOrFail(findOneFilters);
  }

  async update(id: number, filters: FindOneOptions, updateRoomDto: any): Promise<void> {
    this.roomsRepository.update(id, updateRoomDto);
  }

  async remove(id: number): Promise<void> {
    await this.roomsRepository.delete(id);
  }
}

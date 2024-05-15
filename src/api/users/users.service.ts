import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}
  create(createUserDto: CreateUserDto): Promise<User> {
    let user: User;

    user = {
      name: createUserDto.name,
      surname: createUserDto.surname,
      email: createUserDto.email,
      createdAt: new Date(),
    }
    
    return this.usersRepository.createUser(user);
  }

  findAll() {
    return this.usersRepository.findAllUsers({});
  }

  findOne(filters: object) {
    return this.usersRepository.findUser(filters);
  }

  update(filters: object, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(filters, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.removeUser(id);
  }
}

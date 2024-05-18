import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/api/users/entities/user.entity';
import { Trainer } from 'src/api/trainers/entities/trainer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Trainer)
    private trainersRepository: Repository<Trainer>,
  ) {}
  async login(loginDto: LoginDto): Promise<User | boolean> {
    let user: User | boolean;

    user = await this.usersRepository.findOne(
      { 
        where: {
          email: loginDto.email,
          password: loginDto.password
        }
       }
    )

    if (!user) {
      user = false;
    }

    return user;
  }
  async loginTrainer(loginDto: LoginDto): Promise<Trainer | boolean> {
    let trainer: Trainer | boolean;

    trainer = await this.trainersRepository.findOne(
      { 
        where: {
          email: loginDto.email,
          password: loginDto.password
        }
       }
    )

    if (!trainer) {
      trainer = false;
    }
    

    return trainer;
  }
}

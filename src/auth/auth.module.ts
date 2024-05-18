import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/api/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { User } from 'src/api/users/entities/user.entity';
import { Trainer } from 'src/api/trainers/entities/trainer.entity';

@Module({
  imports: [UsersModule, DatabaseModule.forFeature([User]),  DatabaseModule.forFeature([Trainer])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

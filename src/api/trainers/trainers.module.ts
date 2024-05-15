import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { DatabaseModule } from '../../database/database.module';
import { Trainer } from './entities/trainer.entity';
import { ActivitiesModule } from '../activities/activities.module';


@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([Trainer]), ActivitiesModule],
  controllers: [TrainersController],
  providers: [TrainersService],
})
export class TrainersModule {}

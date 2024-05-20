import { TrainersModule } from './../trainers/trainers.module';
import { Module, forwardRef } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { DatabaseModule } from '../../database/database.module';
import { Activity } from './entities/activity.entity';
import { RoomsModule } from '../rooms/rooms.module';
import { ActivityTypesModule } from '../activity-types/activity-types.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    DatabaseModule.forFeature([Activity]),
    RoomsModule,
    ActivityTypesModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}

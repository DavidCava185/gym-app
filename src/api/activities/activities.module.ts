import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { DatabaseModule } from '../../database/database.module';
import { Activity } from './entities/activity.entity';
import { RoomsModule } from '../rooms/rooms.module';
import { ActivityTypesModule } from '../activity-types/activity-types.module';


@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([Activity]), RoomsModule, ActivityTypesModule],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}

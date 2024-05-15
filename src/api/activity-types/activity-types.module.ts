import { Module } from '@nestjs/common';
import { ActivityTypesService } from './activity-types.service';
import { ActivityTypesController } from './activity-types.controller';
import { DatabaseModule } from '../../database/database.module';
import { ActivityType } from './entities/activity-type.entity';


@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([ActivityType])],
  controllers: [ActivityTypesController],
  providers: [ActivityTypesService],
  exports: [ActivityTypesService]
})
export class ActivityTypesModule {}

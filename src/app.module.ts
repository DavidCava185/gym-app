import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TrainersModule } from './api/trainers/trainers.module';
import { ActivitiesModule } from './api/activities/activities.module';
import { ActivityTypesModule } from './api/activity-types/activity-types.module';
import { RoomsModule } from './api/rooms/rooms.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule, TrainersModule, ActivitiesModule, ActivityTypesModule, RoomsModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}

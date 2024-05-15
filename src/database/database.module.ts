import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Activity } from 'src/api/activities/entities/activity.entity';
import { ActivityType } from 'src/api/activity-types/entities/activity-type.entity';
import { Room } from 'src/api/rooms/entities/room.entity';
import { Trainer } from 'src/api/trainers/entities/trainer.entity';
import { User } from 'src/api/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        database: configService.getOrThrow('DB_DATABASE'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        synchronice: 'true',
        entities: [User, Activity, Trainer, ActivityType, Room],
      }),
      inject: [ConfigService],
    })
  ]
})
export class DatabaseModule {
  static forFeature(models: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(models);
  }
}

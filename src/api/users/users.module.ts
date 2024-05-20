import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../database/database.module';
import { User } from './entities/user.entity';
import { ActivitiesModule } from '../activities/activities.module';


@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User]), forwardRef(() => ActivitiesModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

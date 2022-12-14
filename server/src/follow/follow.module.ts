import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from 'src/common/database/follow.schema';
import { FollowRepository } from 'src/common/database/follow.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserService } from 'src/user/user.service';
import { NotificationRepository } from 'src/common/database/notification.repository';
import {
  Notification,
  NotificationSchema,
} from 'src/common/database/notification.schema';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    DatabaseModule,
    EventModule,
  ],
  controllers: [FollowController],
  providers: [
    FollowService,
    FollowRepository,
    UserService,
    NotificationRepository,
  ],
})
export class FollowModule {}

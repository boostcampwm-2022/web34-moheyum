import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from 'src/database/follow.schema';
import { FollowRepository } from 'src/database/follow.repository';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/domain/user/user.service';
import { NotificationRepository } from 'src/database/notification.repository';
import {
  Notification,
  NotificationSchema,
} from 'src/database/notification.schema';
import { EventModule } from 'src/domain/event/event.module';

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

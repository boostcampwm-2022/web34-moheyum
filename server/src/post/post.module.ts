import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../common/database/post.schema';
import { PostRepository } from '../common/database/post.repository';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { FollowRepository } from 'src/common/database/follow.repository';
import { Follow, FollowSchema } from 'src/common/database/follow.schema';
import {
  Notification,
  NotificationSchema,
} from 'src/common/database/notification.schema';
import { NotificationRepository } from 'src/common/database/notification.repository';
import { AlarmModule } from 'src/alarm/alarm.moduel';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    AuthModule,
    DatabaseModule,
    AlarmModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    FollowRepository,
    NotificationRepository,
  ],
})
export class PostModule {}

import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../../database/post.schema';
import { PostRepository } from '../../database/post.repository';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { FollowRepository } from 'src/database/follow.repository';
import { Follow, FollowSchema } from 'src/database/follow.schema';
import {
  Notification,
  NotificationSchema,
} from 'src/database/notification.schema';
import { NotificationRepository } from 'src/database/notification.repository';
import { EventModule } from 'src/domain/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    AuthModule,
    DatabaseModule,
    EventModule,
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

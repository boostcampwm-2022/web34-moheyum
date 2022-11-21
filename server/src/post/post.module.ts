import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../common/database/post.schema';
import { PostRepository } from '../common/database/post.repository';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    AuthModule,
    DatabaseModule,
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}

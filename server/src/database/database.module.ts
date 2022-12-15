import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostRepository } from './post.repository';
import { Post, PostSchema } from './post.schema';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostRepository, UserRepository],
  exports: [PostRepository, UserRepository],
})
export class DatabaseModule {}

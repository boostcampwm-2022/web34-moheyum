import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../common/database/user.schema';
import { UserRepository } from 'src/common/database/user.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Follow, FollowSchema } from 'src/common/database/follow.schema';
import { FollowRepository } from 'src/common/database/follow.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, FollowRepository],
})
export class UserModule {}

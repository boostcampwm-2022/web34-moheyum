import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database/user.schema';
import { UserRepository } from 'src/database/user.repository';
import { DatabaseModule } from 'src/database/database.module';
import { Follow, FollowSchema } from 'src/database/follow.schema';
import { FollowRepository } from 'src/database/follow.repository';
import { NcloudService } from 'src/domain/ncloud/ncloud.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, FollowRepository, NcloudService],
})
export class UserModule {}

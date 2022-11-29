import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../common/database/user.schema';
import { UserRepository } from 'src/common/database/user.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { NcloudService } from 'src/ncloud/ncloud.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, NcloudService],
})
export class UserModule {}

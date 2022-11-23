import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from 'src/common/database/follow.schema';
import { FollowRepository } from 'src/common/database/follow.repository';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    DatabaseModule,
  ],
  controllers: [FollowController],
  providers: [FollowService, FollowRepository],
})
export class FollowModule {}
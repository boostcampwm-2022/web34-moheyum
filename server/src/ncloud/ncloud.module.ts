import { Module } from '@nestjs/common';
import { NcloudService } from './ncloud.service';
import { NcloudController } from './ncloud.controller';

@Module({
  providers: [NcloudService],
  controllers: [NcloudController],
})
export class NcloudModule {}

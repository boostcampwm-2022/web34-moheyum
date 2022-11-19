import { Module } from '@nestjs/common';
import { CacheService } from './redis.service';

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}

import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}
  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }
  async set(key: string, value: string, expire?: number) {
    return this.redisClient.set(key, value, 'EX', expire ?? 60);
  }
  async del(key: string): Promise<number> {
    return this.redisClient.del(key);
  }
}

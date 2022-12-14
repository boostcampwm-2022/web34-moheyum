import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private redisClient: Cache) {}
  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }
  async set(key: string, value: string, ttl?: number) {
    return this.redisClient.set(key, value, { ttl });
  }
  async del(key: string): Promise<void> {
    return this.redisClient.del(key);
  }
}

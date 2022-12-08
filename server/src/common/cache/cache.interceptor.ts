import {
  CacheInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Store } from 'cache-manager';
import { Request } from 'express';
import { Cluster, Redis } from 'ioredis';
import { Observable, tap } from 'rxjs';
import { User } from '../database/user.schema';
import { CACHE_EVICT_METADATA } from './cache.constatns';

@Injectable()
export class MoheyumInterceptor extends CacheInterceptor {
  private readonly CACHE_EVICT_METHODS = ['POST', 'DELETE', 'PUT', ' PATCH'];

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    if (this.CACHE_EVICT_METHODS.includes(req.method)) {
      const reflector: Reflector = this.reflector;
      const evictKeys = reflector.getAllAndMerge(CACHE_EVICT_METADATA, [
        context.getClass(),
        context.getHandler(),
      ]);
      return next.handle().pipe(
        tap(() => {
          if (evictKeys.length > 0) return this.clearCache(evictKeys);
          this.clearCache([req.originalUrl]);
        }),
      );
    }
    return super.intercept(context, next);
  }

  private async clearCacheWithClustering(
    cacheKeys: string[],
  ): Promise<boolean> {
    const client: Cluster = await this.cacheManager.store.getClient();
    const redisNodes = client.nodes();

    const result = await Promise.all(
      redisNodes.map(async (redis) => {
        const _keys = await Promise.all(
          cacheKeys.map((key) => redis.keys(key)),
        );
        const keys = _keys.flat();
        return Promise.all(keys.map((key) => !!this.cacheManager.del(key)));
      }),
    );
    return result.flat().every((r) => !!r);
  }
  private async clearCache(cacheKeys: string[]): Promise<boolean> {
    const redis: Store = await this.cacheManager.store;

    const _keys = await Promise.all(cacheKeys.map((key) => redis.keys(key)));
    const keys = _keys.flat();
    const result = await Promise.all(
      keys.map((key) => !!this.cacheManager.del(key)),
    );
    return !!result;
  }
}

import {
  CacheInterceptor,
  CACHE_KEY_METADATA,
  CallHandler,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Store } from 'cache-manager';
import { Cluster } from 'ioredis';
import { Observable, tap } from 'rxjs';
import {
  CACHE_EVICT_METADATA,
  CACHE_INDIVIDUAL_METADATA,
} from './cache.constatns';

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
          if (evictKeys.length > 0) return this.clearCache(context, evictKeys);
          this.clearCache(context, [req.originalUrl]);
        }),
      );
    }
    return super.intercept(context, next);
  }

  private setCacheIndividualKey(context: ExecutionContext): string {
    const cacheIndividual = this.reflector.get(
      CACHE_INDIVIDUAL_METADATA,
      context.getHandler(),
    );
    switch (cacheIndividual) {
      case 'userid':
        return `_${context.switchToHttp().getRequest().user.userid}`;
      default:
        return '';
    }
  }

  trackBy(context: ExecutionContext): string | undefined {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;

    const appendKey: string = this.setCacheIndividualKey(context);
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );
    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata + appendKey;
    }

    const request = context.getArgByIndex(0);
    if (!this.isRequestCacheable(context)) {
      return undefined;
    }
    return httpAdapter.getRequestUrl(request) + appendKey;
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

  private async clearCache(
    context: ExecutionContext,
    cacheKeys: string[],
  ): Promise<boolean> {
    const redis: Store = await this.cacheManager.store;

    const _keys = await Promise.all(
      cacheKeys.map((key) => {
        key = this.getClearIndividualKey(context, key);
        return redis.keys(key);
      }),
    );
    const keys = _keys.flat();
    const result = await Promise.all(
      keys.map((key) => !!this.cacheManager.del(key)),
    );
    return !!result;
  }

  private getClearIndividualKey(
    context: ExecutionContext,
    key: string,
  ): string {
    const req = context.switchToHttp().getRequest();
    const cacheIndividual = this.reflector.get(
      CACHE_INDIVIDUAL_METADATA,
      context.getHandler(),
    );
    let appendKey = '';
    switch (cacheIndividual) {
      case 'userid':
        appendKey =
          key === ''
            ? `/api/user/mentionlist_${
                context.switchToHttp().getRequest().user.userid
              }`
            : `${key}_${context.switchToHttp().getRequest().user.userid}`;
        break;
      case 'avatar':
        appendKey =
          key === ''
            ? `/api/user/${context.switchToHttp().getRequest().user.userid}`
            : `${key}/${context.switchToHttp().getRequest().user.userid}`;
      default:
        appendKey = key === '' ? req.originalUrl : `${key}`;
        break;
    }
    return appendKey;
  }
}

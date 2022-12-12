import { ConfigModule, ConfigService } from '@nestjs/config';
import { RateLimiterModuleAsyncOptions } from 'nestjs-rate-limiter';

export const rateLimiterConfig: RateLimiterModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    keyPrefix: 'global',
    points: +configService.get('RATE_POINTS'),
    pointsConsumed: 1,
    inmemoryBlockOnConsumed: 0,
    duration: 10,
    blockDuration: 10,
    inmemoryBlockDuration: 0,
    queueEnabled: false,
    whiteList: [],
    blackList: [],
    maxQueueSize: 100,
    omitResponseHeaders: false,
    errorMessage: '서버 요청을 다시 해주세요',
    logger: false,
  }),
  inject: [ConfigService],
};

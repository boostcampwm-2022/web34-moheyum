import { CacheService } from './redis.service';
import { Test } from '@nestjs/testing';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { redisOptions } from '../common/config/redisConfig';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
describe('CacheService', () => {
  let cacheService: CacheService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [join(__dirname, '..', '..', `.env.development`)],
          isGlobal: true, //전역 사용
        }),
        RedisModule.forRootAsync(redisOptions),
      ],
      providers: [CacheService],
    }).compile();
    cacheService = moduleRef.get<CacheService>(CacheService);
  });
  describe('set', () => {
    it('should be defined', () => {
      expect(cacheService.set).toBeDefined();
    });
    it('should return Ok', async () => {
      const result = await cacheService.set('test', 'test', 100);
      expect(result).toBe('OK');
    });
  });
  describe('get', () => {
    it('should be defined', () => {
      expect(cacheService.get).toBeDefined();
    });
    it('should return test', async () => {
      await cacheService.set('test', 'test', 100);
      const result = await cacheService.get('test');
      expect(result).toBe('test');
    });
  });
});

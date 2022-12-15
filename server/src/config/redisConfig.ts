import { CacheModuleAsyncOptions } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';

// const redisOptions: RedisModuleAsyncOptions = {
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService) => ({
//     config: [
//       //clustering대비
//       {
//         host: configService.get<string>('REDIS_HOST'),
//         username: configService.get<string>('REDIS_USERNAME'),
//         password: configService.get<string>('REDIS_PASSWORD'),
//         port: configService.get<number>('REDIS_PORT'),
//       },
//     ],
//   }),
//   inject: [ConfigService],
// };

const redisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get('REDIS_HOST'),
    username: configService.get('REDIS_USERNAME'),
    password: configService.get('REDIS_PASSWORD'),
    port: +configService.get('REDIS_PORT'),
  }),
  inject: [ConfigService],
};
// const redisOptions: CacheModuleAsyncOptions = {
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService) => ({
//     store: redisStore,
//     clusterConfig: {
//       nodes: [
//         {
//           host: configService.get<string>('REDIS_HOST'),
//           username: configService.get<string>('REDIS_USERNAME'),
//           password: configService.get<string>('REDIS_PASSWORD'),
//           port: configService.get<number>('REDIS_PORT'),
//         },
//       ],
//     },
//   }),
//   inject: [ConfigService],
//   isGlobal: true,
// };

// const redisOptions: CacheModuleAsyncOptions = {
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService) => ({
//     store: redisStore,
//     isGlobal: true,
//     host: configService.get('REDIS_HOST'),
//     port: Number(configService.get('REDIS_PORT')),
//     username: configService.get('REDIS_USERNAME'),
//     password: configService.get('REDIS_PASSWORD'),
//     ttl: 100000, //default 5 secs
//   }),
//   inject: [ConfigService],
// };

export { redisOptions };

import { Module, MiddlewareConsumer, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { mongooseConfig } from './common/config/mongooseConfig';
import { redisOptions } from './common/config/redisConfig';
import { RedisModule } from '@liaoliaots/nestjs-redis/dist/redis/redis.module';
import { LoggerMiddleware } from './common/middleware/logger';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';
import { NcloudModule } from './ncloud/ncloud.module';
import { NotificationModule } from './notification/notification.module';
import { EventModule } from './event/event.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-execption.filter';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { rateLimiterConfig } from './common/config/registerConfig';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', `.env.${process.env.NODE_ENV}`)],
      isGlobal: true, //전역 사용
    }),
    RedisModule.forRootAsync(redisOptions),
    MongooseModule.forRootAsync(mongooseConfig),
    RateLimiterModule.registerAsync(rateLimiterConfig),
    PostModule,
    AuthModule,
    UserModule,
    FollowModule,
    NcloudModule,
    NotificationModule,
    EventModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD, //전역 가드 설정
      useClass: RateLimiterGuard,
    },
    Logger,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

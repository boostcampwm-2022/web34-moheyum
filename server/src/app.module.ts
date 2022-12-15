import {
  Module,
  MiddlewareConsumer,
  Logger,
  CacheModule,
  CacheInterceptor,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './domain/post/post.module';
import { AuthModule } from './domain/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { mongooseConfig } from './config/mongooseConfig';
import { redisOptions } from './config/redisConfig';
// import { RedisModule } from '@liaoliaots/nestjs-redis/dist/redis/redis.module';
import { LoggerMiddleware } from './middleware/logger';
import { UserModule } from './domain/user/user.module';
import { FollowModule } from './domain/follow/follow.module';
import { NcloudModule } from './domain/ncloud/ncloud.module';
import { NotificationModule } from './domain/notification/notification.module';
import { EventModule } from './domain/event/event.module';
import { HttpExceptionFilter } from './filter/http-execption.filter';
import { RedisModule } from './domain/redis/redis.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { rateLimiterConfig } from './config/registerConfig';
import { MailModule } from './domain/mail/mail.module';
import { mailAsyncOptions } from './config/mailConfig';
@Module({
  imports: [
    // RedisModule.forRootAsync(redisOptions),
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', `.env.${process.env.NODE_ENV}`)],
      isGlobal: true, //전역 사용
    }),
    CacheModule.registerAsync(redisOptions),
    MongooseModule.forRootAsync(mongooseConfig),
    RateLimiterModule.registerAsync(rateLimiterConfig),
    MailModule.forRootAsync(mailAsyncOptions),
    PostModule,
    AuthModule,
    UserModule,
    FollowModule,
    NcloudModule,
    NotificationModule,
    EventModule,
    RedisModule,
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

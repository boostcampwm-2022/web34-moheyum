import {
  Module,
  MiddlewareConsumer,
  Logger,
  CacheModule,
  CacheInterceptor,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { mongooseConfig } from './common/config/mongooseConfig';
import { redisOptions } from './common/config/redisConfig';
// import { RedisModule } from '@liaoliaots/nestjs-redis/dist/redis/redis.module';
import { LoggerMiddleware } from './common/middleware/logger';
import { UserModule } from './user/user.module';
import { FollowModule } from './follow/follow.module';
import { NcloudModule } from './ncloud/ncloud.module';
import { NotificationModule } from './notification/notification.module';
import { EventModule } from './event/event.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-execption.filter';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    // RedisModule.forRootAsync(redisOptions),
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', `.env.${process.env.NODE_ENV}`)],
      isGlobal: true, //전역 사용
    }),
    CacheModule.registerAsync(redisOptions),
    MongooseModule.forRootAsync(mongooseConfig),
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
    Logger,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

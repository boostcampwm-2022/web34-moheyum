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
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-execption.filter';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', `.env.${process.env.NODE_ENV}`)],
      isGlobal: true, //전역 사용
    }),
    RedisModule.forRootAsync(redisOptions),
    MongooseModule.forRootAsync(mongooseConfig),
    PostModule,
    AuthModule,
    UserModule,
    FollowModule,
    NcloudModule,
    NotificationModule,
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

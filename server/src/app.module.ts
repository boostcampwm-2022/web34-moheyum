import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from '@modules';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { LoggerMiddleware } from './middleware/logger';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, '..', '..', `.env.${process.env.NODE_ENV}`),
      ],
      isGlobal: true, //전역 사용
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

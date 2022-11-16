import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { mongooseConfig } from './common/config/mongooseConfig';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', `.env.${process.env.NODE_ENV}`)],
      isGlobal: true, //전역 사용
    }),
    MongooseModule.forRootAsync(mongooseConfig),
    PostModule,
    AuthModule,
  ],
})
export class AppModule {}

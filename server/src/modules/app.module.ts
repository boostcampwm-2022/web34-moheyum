import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath:[`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      isGlobal: true, //전역 사용
      
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

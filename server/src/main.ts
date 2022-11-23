import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import * as dotenv from 'dotenv';
// import * as path from 'path';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/httpexecption.filter';
import { BadRequestExceptionFilter } from './common/filter/badrequest.filter';
import { ConfigService } from '@nestjs/config';

// TODO : config 모듈로 변경해야함
// if (!process.env.NODE_ENV) throw new Error('No NODE_ENV');
// dotenv.config({
//   path: path.resolve(`.env.${process.env.NODE_ENV}`),
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.use(cookieParser());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new BadRequestExceptionFilter(),
  );
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();

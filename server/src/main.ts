import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
// import * as dotenv from 'dotenv';
// import * as path from 'path';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { winstonLogger } from './common/utils/winston.util';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
    forceCloseConnections: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  app.use(cookieParser());
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.enableShutdownHooks();
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();

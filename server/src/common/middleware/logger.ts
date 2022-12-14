import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    //응답이 끝날시 로그를 작성
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${req.ip}/${originalUrl} ${req.get(
          'user-agent',
        )} [ ${method} ${statusCode} ] `,
      );
    });
    next();
  }
}

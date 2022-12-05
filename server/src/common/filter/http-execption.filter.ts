import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  LoggerService,
  Inject,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const log = {
      timestamp: new Date().toLocaleDateString(),
      url: req.url,
      ip: req.ip,
      agent: req.get('user-agent'),
      message: exception.message,
      stack: exception.stack,
    };
    if (status >= 500) this.logger.error(log);
    else this.logger.warn(log);
    res.status(status).json({
      path: req.url,
      message: exception.message,
    });
  }
}

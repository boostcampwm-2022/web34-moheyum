import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  /**
   * @descrption 예외처리 함수
   * @param exception
   * @param host
   */
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const res: any = (exception as HttpException).getResponse();
    const log = {
      timestamp: new Date(),
      url: request.url,
      response,
    };
    this.logger.error(log);
    /* status + 메시지 전달 */
    response.status(status).json({
      success: false,
      message: res.message,
    });
  }
}

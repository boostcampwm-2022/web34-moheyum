import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    response
      .status(status)
      // you can manipulate the response here
      .json({
        success: 'false',
        path: request.url,
        message: exception.message ?? '잘못된 형태의 입력이 들어왔습니다',
      });
  }
}

import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class PostException {
  static postUnAuthorized(): HttpException {
    return new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: '게시글에 대한 권한이 없습니다',
    });
  }

  static postNotFound(): HttpException {
    return new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: '해당 게시글이 없습니다',
    });
  }
}

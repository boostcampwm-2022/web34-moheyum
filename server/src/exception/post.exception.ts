import { HttpException, HttpStatus } from '@nestjs/common';

export class PostUnAuthorizedException extends HttpException {
  constructor(message?) {
    super(message ?? `게시글에 대한 권한이 없습니다`, HttpStatus.UNAUTHORIZED);
    this.name = 'postUnAuthorizedException';
  }
}
export class PostNotFoundException extends HttpException {
  constructor(message?) {
    super(message ?? `해당 게시글이 없습니다`, HttpStatus.NOT_FOUND);
    this.name = 'PostNotFoundException';
  }
}

import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export class CommonMailerFail extends HttpException {
  constructor(message?) {
    super(message ?? '메시지 전송 실패', HttpStatus.BAD_REQUEST);
    this.name = 'CommonMailerFailException';
  }
}

export class CommonCreateCodeFail extends HttpException {
  constructor(message?) {
    super(message ?? '인증 코드 생성 실패', HttpStatus.BAD_REQUEST);
    this.name = 'CommonCreateCodeFailException';
  }
}

export class CommonCheckCodeMismatch extends HttpException {
  constructor(message?) {
    super(message ?? '인증 코드가 일치하지 않습니다', HttpStatus.BAD_REQUEST);
    this.name = 'CommonCheckCodeMismatchException';
  }
}

export class CommonExpiredToken extends HttpException {
  constructor(message?) {
    super(message ?? '토큰이 만료되었습니다', HttpStatus.BAD_REQUEST);
    this.name = 'CommonExpiredTokenException';
  }
}

import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export class CommonException {
  static commonMailerFail(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '메시지 전송 실패',
    });
  }
  static commonCreateCodeError(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '인증 코드 생성 실패',
    });
  }
  static commonCheckCodeFail(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '인증 코드 일치하지 않습니다',
    });
  }
  static commonReCheck(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '다시 전송해주세요',
    });
  }
  static commonExpiredToekn(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '토큰이 만료되었습니다',
    });
  }
}

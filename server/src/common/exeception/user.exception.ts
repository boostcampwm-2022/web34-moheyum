import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class UserException {
  static userNotFound(): HttpException {
    return new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: '해당하는 사용자가 없습니다',
    });
  }
  static userAlreadyExist(): HttpException {
    return new NotFoundException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '이미 등록된 사용자입니다',
    });
  }

  static userDuplicateNickname(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '중복된 닉네임입니다',
    });
  }
  static userDuplicateId(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '중복된 아이디입니다',
    });
  }
  static userDuplicateEmail(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '중복된 이메일입니다',
    });
  }
  static userUnAuthorized(): HttpException {
    return new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: '입력된 사용자 정보가 올바르지 않습니다',
    });
  }
  static userUnAuthorizedToken(): HttpException {
    return new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: '토큰 값이 정확하지 않습니다',
    });
  }
  static userUnAuthorizedUpdate(): HttpException {
    return new UnauthorizedException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: '사용자 업데이트 권한이 없습니다',
    });
  }
  static userStateFalse(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '탈퇴한 사용자입니다',
    });
  }
}

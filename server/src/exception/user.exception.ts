import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(message?) {
    super(message ?? `해당하는 사용자가 없습니다`, HttpStatus.NOT_FOUND);
    this.name = 'userNotFoundException';
  }
}
export class UserAlreadyExistException extends HttpException {
  constructor(message?) {
    super(message ?? `이미 등록된 사용자입니다`, HttpStatus.BAD_REQUEST);
    this.name = 'userAlreadyExistException';
  }
}
export class UserDuplicateNicknameException extends HttpException {
  constructor(message?) {
    super(message ?? `중복된 닉네임입니다`, HttpStatus.BAD_REQUEST);
    this.name = 'userDuplicateNicknameException';
  }
}
export class UserDuplicateIdException extends HttpException {
  constructor(message?) {
    super(message ?? `중복된 아이디입니다`, HttpStatus.BAD_REQUEST);
    this.name = 'userDuplicateIdException';
  }
}
export class UserDuplicateEmailException extends HttpException {
  constructor(message?) {
    super(message ?? `중복된 이메일입니다`, HttpStatus.BAD_REQUEST);
    this.name = 'userDuplicateEmailException';
  }
}
export class UserUnAuthorizedException extends HttpException {
  constructor(message?) {
    super(
      message ?? `입력된 사용자 정보가 올바르지 않습니다`,
      HttpStatus.UNAUTHORIZED,
    );
    this.name = 'userUnAuthorizedException';
  }
}
export class UserUnAuthorizedTokenException extends HttpException {
  constructor(message?) {
    super(message ?? `토큰 값이 정확하지 않습니다`, HttpStatus.UNAUTHORIZED);
    this.name = 'userUnAuthorizedTokenException';
  }
}
export class UserUnAuthorizedUpdateException extends HttpException {
  constructor(message?) {
    super(
      message ?? `사용자 업데이트 권한이 없습니다`,
      HttpStatus.UNAUTHORIZED,
    );
    this.name = 'userUnAuthorizedUpdateException';
  }
}
export class UserStateFalseException extends HttpException {
  constructor(message?) {
    super(message ?? `탈퇴한 사용자입니다`, HttpStatus.BAD_REQUEST);
    this.name = 'userStateFalseException';
  }
}

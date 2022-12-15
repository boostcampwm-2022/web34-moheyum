import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export class FollowMyself extends HttpException {
  constructor(message?) {
    super(
      message ?? '자기 자신은 팔로우 할 수 없습니다',
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'FollowMyselfException';
  }
}

export class FollowCancelMySelf extends HttpException {
  constructor(message?) {
    super(
      message ?? '자기 자신은 팔로우 할 수 없습니다',
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'FollowCancelMySelfException';
  }
}
export class FollowAlready extends HttpException {
  constructor(message?) {
    super(message ?? '이미 팔로우 된 사람입니다', HttpStatus.BAD_REQUEST);
    this.name = 'FollowAlreadyException';
  }
}

export class FollowCancelAlready extends HttpException {
  constructor(message?) {
    super(message ?? '이미 팔로우 취소 된 사람입니다', HttpStatus.BAD_REQUEST);
    this.name = 'FollowCancelAlreadyException';
  }
}

export class FollowError extends HttpException {
  constructor(message?) {
    super(message ?? '팔로우 에러 다시 시도해보세요', HttpStatus.BAD_REQUEST);
    this.name = 'FollowErrorException';
  }
}

export class FollowCancelError extends HttpException {
  constructor(message?) {
    super(
      message ?? '팔로우 취소 에러 다시 시도해보세요',
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'FollowCancelErrorException';
  }
}

export class FollowConflict extends HttpException {
  constructor(message?) {
    super(message ?? 'Conflict', HttpStatus.BAD_REQUEST);
    this.name = 'FollowConflictException';
  }
}

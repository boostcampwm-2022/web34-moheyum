import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export class FollowException {
  static followMyId(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '자기 자신은 팔로우 할 수 없습니다',
    });
  }
  static followCancelMyId(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '자기 자신은 팔로우 취소 할 수 없습니다',
    });
  }
  static followAlready(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '이미 팔로우 된 사람입니다',
    });
  }
  static followCancelAlready(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '이미 팔로우 취소 된 사람입니다',
    });
  }
  static followError(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '팔로우 에러 다시 시도해보세요',
    });
  }
  static followCancelError(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '팔로우 취소 에러 다시 시도해보세요',
    });
  }
  static followConflict(): HttpException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: '',
    });
  }
}

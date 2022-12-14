import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenExpiredError } from 'jsonwebtoken';
import { CommonException } from '../exeception/common.exception';
import { UserException } from '../exeception/user.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-strategy') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (info instanceof TokenExpiredError) {
      throw CommonException.commonExpiredToekn();
    }
    if (err || !user) {
      throw err || UserException.userUnAuthorizedToken();
    }
    return user;
  }
}

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { TokenExpiredError } from 'jsonwebtoken';
import { CommonException } from '../exeception/common.exception';
import { UserUnAuthorizedTokenException } from 'src/exeception/user.exception';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
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
      throw err || new UserUnAuthorizedTokenException();
    }
    return user;
  }
}

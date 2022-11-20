import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (info instanceof TokenExpiredError) {
      throw new HttpException(
        { message: '토큰 인증 만료' },
        HttpStatus.FORBIDDEN,
      );
    }
    console.log(info);
    console.log(user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserException } from '../exeception/user.exception';

@Injectable()
export class UpdateAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userid = req.params.userid;
    if (req.user.userid === userid) return true;

    throw UserException.userUnAuthorizedUpdate();
  }
}

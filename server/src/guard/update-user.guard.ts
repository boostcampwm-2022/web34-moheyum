import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserUnAuthorizedUpdateException } from '../exception/user.exception';

@Injectable()
export class UpdateAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userid = req.params.userid;
    if (req.user.userid === userid) return true;
    throw new UserUnAuthorizedUpdateException();
  }
}

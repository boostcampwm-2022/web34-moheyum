import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetPayload = createParamDecorator(
  (data, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

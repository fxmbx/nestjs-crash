import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user['data'];
  },
);

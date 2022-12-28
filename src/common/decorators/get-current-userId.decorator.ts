import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { Request } from 'express';

export const GetCurrentUserID = createParamDecorator(
  (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;
    return request.user['sub'];
  },
);

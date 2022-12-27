import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { throwError } from 'rxjs';

let fields: Array<string> = [];
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('logger middleware...');
    console.log(req.headers.authorization);
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException(
        'no authrization header present',
        HttpStatus.UNAUTHORIZED,
      );
    }
    fields = authorization.split(' ');
    if (fields[0].toLowerCase() != 'bearer') {
      throw new HttpException(
        'invalid authorization token',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // if (fields[1] != 'let my people go')
    //   throw new HttpException('invalid tokne ', HttpStatus.UNAUTHORIZED);
    next();
  }
}

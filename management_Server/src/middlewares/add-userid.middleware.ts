import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AddUseridMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userid = req.body['phone']
    if (userid) {
      req.body['id'] = userid.slice(0, 2)
    }
    next();
  }
}

/*
 * @Author: your name
 * @Date: 2021-03-18 15:45:29
 * @LastEditTime: 2021-03-18 16:14:10
 * @LastEditors: Please set LastEditors
 * @Description: 用户密码中间件
 * @FilePath: \project\final\src\middlewares\hash-password.middleware.ts
 */
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { encript, addSalt } from '../utils/encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userPassword = req.body['password']
    if (userPassword) {
      const salt = addSalt()
      userPassword = encript(userPassword, addSalt())
      req.body['password'] = userPassword
      req.body['salt'] = salt
    }
    next();
  }
}

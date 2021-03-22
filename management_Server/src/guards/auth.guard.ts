/*
 * @Author: your name
 * @Date: 2021-03-19 17:26:08
 * @LastEditTime: 2021-03-19 18:17:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\guards\auth.guard.ts
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    // switch (context.switchToHttp().getRequest().user) {
    //   case 'user':
    //     roles
    //     return true
    //     break;
    
    //   default:
    //     break;
    // }
    return true;
  }
}

/*
 * @Author: your name
 * @Date: 2021-03-21 09:57:12
 * @LastEditTime: 2021-03-21 20:19:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\auth\auth.service.ts
 */
import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from '../users/users.service';
import { IResponse } from '../interface/response.interface';
import { encript } from '../utils/encription';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

const logger = new Logger('auth.service')

@Injectable()
export class AuthService {
  protected response: IResponse;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * @description: 用户登录验证
   * @param {User} user
   * @return {*}
   */
  private async validateUser(user: User) {
    const phone: string = user.phone;
    const password: string = user.password;
    return await this.usersService.findOneByPhone(phone)
      .then(res => {
        if (res == undefined) {
          this.response = {
            code: 3,
            msg: "用户尚未注册"
          }
          throw this.response
        }
        return res
      })
      .then((dbUser: User) => {
        const pass = encript(password, dbUser.salt);
        if (pass === dbUser.password) {
          this.response = {
            code: 0,
            msg: "登录成功"
          }
          return this.response
        } else {
          this.response = {
            code: 4,
            msg: "用户密码错误"
          }
          throw this.response
        }
      })
      .catch(err => {
        return err
      })
  }

  /**
   * @description: 用户登录方法
   * @param {User} user
   * @return {*}
   */
  public async login(user: User) {
    return await this.validateUser(user)
      .then(async (res: IResponse) => {
        if (res.code !== 0) {
          this.response = res;
          throw this.response
        }
        this.response = {
          code: 0,
          msg: { token: await this.createToken(user) }
        }
        return this.response
      })
      .catch(err => {
        return err
      })
  }

  /**
   * @description: 用户修改密码方法
   * @param {User} user
   * @return {*}
   */
  public async alter(user: User) {
    return this.usersService.findOneByPhone(user.phone)
      .then(async(res) => {
        await this.usersRepository.save(user)
        return this.response = {
          code: 0,
          msg: '用户修改成功'
        }
      })
  }

    /**
   * @description: 用户注册接口
   * @param {User} user
   * @return {*}
   */
  public async regist(user: User) {
    return await this.usersService.findOneByPhone(user.phone)
      .then((res) => {
        if (res !== undefined) {
          this.response = {
            code: 1,
            msg: "当前手机号已注册"
          }
          throw this.response
        }
      })
      .then(async() => {
        try {
          await this.usersRepository.save(user);
          this.response = {
            code: 0,
            msg: "用户注册成功"
          }
          return this.response
        } catch (error) {
          this.response = {
            code: 2,
            msg: "用户注册失败，请联系相关负责人，错误详情:" + error
          }
          throw this.response
        }
      })
      .catch((err) => {
        Logger.log(`${user.phone}:${err.msg}`)
        return this.response
      })
  }

  /**
   * @description: 创建token 
   * @param {User} User
   * @return {*}
   */ 
  private async createToken(user: User) {
    return await this.jwtService.sign(user)
  }

}

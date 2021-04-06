/*
 * @Author: your name
 * @Date: 2021-03-21 09:57:12
 * @LastEditTime: 2021-04-06 20:11:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\auth\auth.service.ts
 */
import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UsersService } from '../users/users.service';
import { IResponse } from '../../interface/response.interface';
import { encript } from '../../utils/encription';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

const logger = new Logger('auth.service')
const svgCaptcha = require('svg-captcha');

@Injectable()
export class AuthService {
  protected response: IResponse;
  private pointer: number = 0; // 定义指示器
  private captchas = {}; // 保存验证码信息
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
        const use = await this.usersRepository.findOne(user.phone)
        this.response = {
          code: 0,
          msg: { 
            token: await this.createToken(user),
            userid: use.id
          }
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

  /**
   * @description: 使用 svg-captcha包 创建验证码
   * @param {*}
   * @return {*}
   */
  public async createCaptcha(id?: string) {
    if (id !== '-1') {
      delete this.captchas[id]
    }
    const c = svgCaptcha.create()
    this.captchas[this.pointer] = c.text
    console.log(this.captchas)
    this.response = {
      code: 0,
      msg: {
        id: this.pointer++,
        img: c.data
      }
    }
    return this.response
  }

  //  验证注册验证码
  public async verification(captcha: string, id: string) {
    if (this.captchas[id] === captcha) {
      this.response = {
        code: 0,
        msg: "验证通过"
      }
    } else {
      this.response = {
        code: -5,
        msg: "验证码错误"
      }
    }
    return this.response
  }
}

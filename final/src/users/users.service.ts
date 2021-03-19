/*
 * @Author: your name
 * @Date: 2021-03-16 18:53:38
 * @LastEditTime: 2021-03-19 15:10:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\users\users.service.ts
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IResponse } from '../interface/response.interface';

const logger = new Logger('users.service')

@Injectable()
export class UsersService {
  protected response: IResponse;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  /**
   * @description: 用户注册接口
   * @param {User} user
   * @return {*}
   */
  async regist(user: User) {
    // await this.usersRepository.findOne(user.id).then((res) => {
    //   console.log(res);
    // });
    return await this.findOneByPhone(user.phone)
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

  async remove(phone: string): Promise<void> {
    await this.usersRepository.delete(phone);
  }

  /**
   * @description: 通过手机号查询用户
   * @param {string} phone
   * @return {*}
   */
  private async findOneByPhone(phone: string) {
    return await this.usersRepository.findOne(phone)
  }
}

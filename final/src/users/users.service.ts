/*
 * @Author: your name
 * @Date: 2021-03-16 18:53:38
 * @LastEditTime: 2021-03-17 21:39:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\users\users.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
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
  async regist(user: User): Promise<void> {
    // await this.usersRepository.findOne(user.id).then((res) => {
    //   console.log(res);
    // });
    await this.usersRepository
      .findOne(user.id)
      .then((res) => {
        if (res) {
          throw Error('用户已注册');
        } else {
          try {
            this.usersRepository.save(user);
            console.log('hhhhhh');
          } catch (error) {
            throw Error('保存用户失败' + error);
          }
        }
      })
      .catch((err) => {
        console.warn(`发生问题--${err}`);
      });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

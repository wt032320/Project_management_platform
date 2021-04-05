/*
 * @Author: your name
 * @Date: 2021-03-16 18:53:38
 * @LastEditTime: 2021-04-05 21:37:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\users\users.service.ts
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'nestjs-redis';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { IResponse } from '../../interface/response.interface';
import * as Redis from 'ioredis';

@Injectable()
export class UsersService {
  protected response: IResponse;
  private redis: Redis.Redis;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly redisService: RedisService // 注入redis服务
  ) { this.redis = this.redisService.getClient("management") }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async remove(phone: string): Promise<void> {
    await this.usersRepository.delete(phone);
  }

  /**
   * @description: 通过手机号查询用户
   * @param {string} phone
   * @return {*}
   */
  public async findOneByPhone(phone: string) {
    return await this.usersRepository.findOne(phone)
  }

  /**
   * @description: 通过userid 获取用户
   * @param {string} id
   * @return {*}
   */
  public async findOneById(id: string) {
    return await this.usersRepository.findOne(id)
  }

  public async addUserProject(projectId: string, userid: string) {
    const user =  await this.findOneById(userid)
    Logger.log(user.projectIds)
    // user.projectIds + projectId + ''
    // await this.usersRepository.save(user)
  } 
}

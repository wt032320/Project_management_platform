/*
 * @Author: your name
 * @Date: 2021-03-16 18:53:38
 * @LastEditTime: 2021-03-21 17:20:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\users\users.service.ts
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'nestjs-redis';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IResponse } from '../interface/response.interface';
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

  public async hello() {
    return await this.redis.set("management", "hello world")
  }
}

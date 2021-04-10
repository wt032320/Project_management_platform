/*
 * @Author: your name
 * @Date: 2021-03-16 18:53:38
 * @LastEditTime: 2021-04-10 19:30:57
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
import { IUserProject } from 'src/interface/project.interface';

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
   * @param {string} userid
   * @return {*}
   */
  public async findOneById(userid: string) {
    return await this.usersRepository.findOne({ id: userid })
    // try {
    //   const _user = await this.usersRepository.findOne({id: userid})
    //   this.response = {
    //     code: 0,
    //     msg: _user
    //   }
    // } catch (error) {
    //   this.response = {
    //     code: 7,
    //     msg: error
    //   }
    // }
    // return this.response
  }

  public async addUserProject(projectId: string, userid: string) {
    
    const user = await this.findOneById(userid)
    const userProject: IUserProject = {
      projectId,
      identity: "项目经理"
    }
    const str = JSON.stringify(userProject)
    if (user.projects === null ) {
      const news = `${str} `
      user.projects = news
      await this.usersRepository.save(user)
    } else {
      const news = user.projects.concat(`${str} `)
      user.projects = news
      await this.usersRepository.save(user)
    }
  }
}

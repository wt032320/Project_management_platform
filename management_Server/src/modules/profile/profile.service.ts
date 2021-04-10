import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../../entities/profile.entity';
import { getConnection, Repository } from 'typeorm';
import { IResponse } from 'src/interface/response.interface'


@Injectable()
export class ProfileService {

  private response: IResponse

  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) { }

  /**
   * @description: 用户完善信息
   * @param {Profile} userInfo
   * @return {*}
   */
  public async creatUserInfo(userInfo: Profile) {
    try {
      await this.profileRepository.save(userInfo)
      this.response = {
        code: 0,
        msg: "用户信息保存成功"
      }
    } catch (error) {
      this.response = {
        code: 0,
        msg: error
      }
    }
    return this.response
  }

  public async getUserInfo(userid: string) {
    try {
      const _userInfo = await this.profileRepository.findOne({id: userid})
      console.log(_userInfo)
      this.response = {
        code: 0,
        msg: _userInfo
      }
    } catch (error) {
      this.response = {
        code: 7,
        msg: '获取用户个人信息失败' + error 
      }
    }
    return this.response
  }
}

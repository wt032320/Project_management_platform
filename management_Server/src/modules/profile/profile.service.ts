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

  public async addId(userid: string) {
    return await getConnection()
      .createQueryBuilder()
      .update(Profile)
      .set( {id: userid} )
      .where("id is null")
      .execute()
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from '../../entities/photo.entity';
import { Repository } from 'typeorm';
import { IResponse } from '../../interface/response.interface';

@Injectable()
export class PhotoService {
  
  private response: IResponse

  constructor(
    @InjectRepository(Photo)
    private photoReposity: Repository<Photo>
  ) { }

  public async uploadPhoto(userPhoto: Photo) {
    try {
      await this.photoReposity.save(userPhoto)
      this.response = {
        code: 0,
        msg: '头像设置成功'
      }
    } catch (error) {
      this.response = {
        code: 7,
        msg: error
      }
    }
    return this.response
  }
}

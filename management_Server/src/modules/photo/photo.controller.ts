import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Photo } from 'src/entities/photo.entity';
import { PhotoService } from './photo.service';

@Controller('photo')
@ApiTags('用户头像')
export class PhotoController {
  constructor (
    private readonly photoService: PhotoService
  ) { }

  @Post('upload/:id')
  @ApiOperation({
    summary: '上传头像'
  })
  public uploadImage(@Param("id") userid: string, @Body() userImage: string) {
    const userinfo: Photo = {
      id: userid,
      photo: userImage
    }
    return this.photoService.uploadPhoto(userinfo)
  }
}

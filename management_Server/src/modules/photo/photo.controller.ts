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

  @Post('upload')
  @ApiOperation({
    summary: '上传头像'
  })
  public uploadImage(@Body() userImage: Photo) {
    return this.photoService.uploadPhoto(userImage)
  }
}

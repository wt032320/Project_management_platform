import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { Profile } from '../../entities/profile.entity';

@Controller('profile')
@ApiTags("用户中心")
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) { }

  @Post('add')
  @ApiOperation({
    summary: '完善个人信息'
  })
  public perfectUserInfo(@Body() userInfo: Profile) {
    return this.profileService.creatUserInfo(userInfo)
  }

  @Post('test/:id')
  public add(@Param('id') userid: string) {
    return this.profileService.addId(userid)
  }
}

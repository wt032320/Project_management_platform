import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags("用户中心")
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) { }

  @Get("test")
  @ApiOperation({
    summary: 'test'
  })
  public getHello(): string {
    return 'hello'
  }
}

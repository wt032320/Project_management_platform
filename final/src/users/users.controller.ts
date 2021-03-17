import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

@ApiTags('新用户注册')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('regist')
  @ApiOperation({
    summary: 'regist',
  })
  async registUser(@Body() userData: User) {
    return await this.usersService.regist(userData);
  }
}

/*
 * @Author: your name
 * @Date: 2021-03-21 09:58:12
 * @LastEditTime: 2021-03-30 19:56:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\auth\auth.controller.ts
 */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户登录注册模块')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @ApiOperation({
    summary: '用户登录'
  })
  public async userLogin(@Body() userDto: User) {
    return await this.authService.login(userDto)
  }

  @Post('regist')
  @ApiOperation({
    summary: 'regist',
  })
  async registUser(@Body() userData: User) {
    return await this.authService.regist(userData);
  }

  @Post('alter')
  @ApiOperation({
    summary: "用户修改接口"
  })
  async alterUser(@Body() userDto: User) {
    return await this.authService.alter(userDto)
  }

  // @Get('sss')
  // @ApiBearerAuth('jwt')
  // dd() {
  //   return 'ejeeee'
  // }

  @Get('captcha/:id')
  @ApiOperation({
    summary: "获取注册验证码"
  })
  async getCaptcha(@Param('id') id: string) {
    return await this.authService.createCaptcha(id)
  }

  @Post('verify')
  @ApiOperation({
    summary: "验证注册验证码"
  })
  async verify(@Body() captcha: {captcha: string, id: string}) {
    return await this.authService.verification(captcha.captcha, captcha.id)
  }
}

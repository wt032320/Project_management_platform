/*
 * @Author: your name
 * @Date: 2021-03-16 15:18:39
 * @LastEditTime: 2021-03-16 16:04:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\app.controller.ts
 */
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('app总模块')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: '测试接口',
  })
  getHello(): string {
    return this.appService.getGoodbye();
  }
}

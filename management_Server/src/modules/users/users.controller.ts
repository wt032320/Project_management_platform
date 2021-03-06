import { Body, Controller, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../../entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { Role } from '../roles/role.decorator';

@ApiTags('用户信息模块')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get('find/:id')
  @ApiOperation({
    summary: "findById"
  })
  public find(@Param("id") creatorid: string) {
    return this.usersService.findOneById(creatorid)
  }
}

import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from '../../entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../../entities/user.entity';

@Module({
  // 该模块使用该forFeature()方法定义在当前作用域中注册了哪些存储库
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Project]),
  ],
  
  controllers: [ProjectController],
  providers: [
    UsersService,
    ProjectService
  ]
})
export class ProjectModule {}

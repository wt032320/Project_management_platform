/*
 * @Author: your name
 * @Date: 2021-03-16 18:53:06
 * @LastEditTime: 2021-03-18 15:45:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\users\users.module.ts
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from '../entities/user.entity';
import { HashPasswordMiddleware } from '../middlewares/hash-password.middleware';

@Module({
  // 该模块使用该forFeature()方法定义在当前作用域中注册了哪些存储库
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // .forRouters('users') 为只在@Controller('users')中使用
    consumer.apply(HashPasswordMiddleware).forRoutes('users/regist');
  }
}

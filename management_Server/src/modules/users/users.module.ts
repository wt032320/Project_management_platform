
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from '../../entities/user.entity';
import { HashPasswordMiddleware } from '../../middlewares/hash-password.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../guards/auth.guard';

@Module({
  // 该模块使用该forFeature()方法定义在当前作用域中注册了哪些存储库
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [UsersController],
  exports: [UsersService],
})

export class UsersModule  {}

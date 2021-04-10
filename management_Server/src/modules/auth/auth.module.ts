import { Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { HashPasswordMiddleware } from '../../middlewares/hash-password.middleware';
import { MiddlewareBuilder } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { AddUseridMiddleware } from '../../middlewares/add-userid.middleware';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
      signOptions: { expiresIn: '60000s' },
    })
  ],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareBuilder) {
    // .forRouters('auth/regist) 为只在@Controller('auth/regist')中使用中间件进行密码加密
    consumer.apply(HashPasswordMiddleware).forRoutes('auth/regist')
      .apply(HashPasswordMiddleware).forRoutes('auth/alter')
      .apply(AddUseridMiddleware).forRoutes('auth/regist')
  }
}
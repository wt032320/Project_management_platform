import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './entities/user.entity';
import { Log4jsModule } from '@nestx-log4js/core';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { ProjectModule } from './modules/project/project.module';
import { Project } from './entities/project.entity';

const options: RedisModuleOptions = {
  port: 6379,
  name: 'management',
  host: '127.0.0.1'
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'wt182320..',
      database: 'pmp',
      // 要开始使用该User实体，我们需要通过将其插入到entities模块forRoot()方法选项中的数组中来让TypeORM知道它
      entities: [User, Project],
      // synchronize: true, // 不应在生产中使用设置,否则可能回丢失生产数据
    }),
    // 加载子模块
    UsersModule,
    Log4jsModule.forRoot(),
    AuthModule,
    RedisModule.register(options),
    ProjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

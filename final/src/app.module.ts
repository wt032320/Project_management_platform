/*
 * @Author: your name
 * @Date: 2021-03-16 15:18:39
 * @LastEditTime: 2021-03-19 14:32:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { Log4jsModule } from '@nestx-log4js/core';

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
      entities: [User],
      // synchronize: true, // 不应在生产中使用设置,否则可能回丢失生产数据
    }),
    // 加载子模块
    UsersModule,
    Log4jsModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

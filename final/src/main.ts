/*
 * @Author: your name
 * @Date: 2021-03-16 15:18:39
 * @LastEditTime: 2021-03-21 16:04:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\main.ts
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Log4jsLogger } from '@nestx-log4js/core';
import { AppModule } from './app.module';

const listenPost = 8000;
const logger = new Logger('main.ts');

/**
 * @description: 主方法
 */
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  /**
   * @description: 配置Swaagger
   */
  const config = new DocumentBuilder()
    .setTitle('项目管理平台')
    .setDescription('xxx平台接口文档')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt'
    )
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  /**
   * @description: 使用log4js 日志框架
   */
  app.useLogger(app.get(Log4jsLogger));

  await app.listen(listenPost);
};
bootstrap().then(() => {
  logger.log(`listen in http://localhost:${listenPost}/swagger-ui`);
});

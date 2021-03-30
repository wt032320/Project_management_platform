/*
 * @Author: your name
 * @Date: 2021-03-16 17:06:25
 * @LastEditTime: 2021-03-30 16:05:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\entities\user.entity.ts
 */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '用户手机号',
    example: '15291083796'
  })
  phone: string;

  @Column()
  @ApiProperty({
    description: '用户密码',
    example: '11111111'
  })
  password: string;

  @Column()
  salt?: string;
}
/*
 * @Author: your name
 * @Date: 2021-03-16 17:06:25
 * @LastEditTime: 2021-04-09 22:25:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\entities\user.entity.ts
 */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from './profile.entity';

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

  @Column({nullable: true})
  projects?: string;

  @Column()
  salt?: string;

  @Column()
  id?: string;

}
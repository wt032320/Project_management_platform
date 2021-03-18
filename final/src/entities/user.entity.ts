/*
 * @Author: your name
 * @Date: 2021-03-16 17:06:25
 * @LastEditTime: 2021-03-18 16:47:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\entities\user.entity.ts
 */
/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  password: string;

  // @Column()
  // salt?: string;
}
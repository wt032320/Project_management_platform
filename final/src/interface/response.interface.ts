/*
 * @Author: your name
 * @Date: 2021-03-19 13:04:25
 * @LastEditTime: 2021-03-21 16:09:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \project\final\src\interface\response.interface.ts
 */
/**
 * @description: 返回报文格式
 * @param {*}
 * @return {*}
 */

export interface IResponse {
  code: number; // 0 成功
  msg: any;
}
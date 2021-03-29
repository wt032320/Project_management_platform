/**
 * @description: 用户登录表
 * @param {*}
 * @return {*}
 */

import { ICaptcha } from '@/typings';
import api from '..';

interface IUserInfo {
  phone: string;
  password: string;
}

/**
 * @description: 登录请求
 * @param {IUserInfo} user
 * @return {*}
 */
export async function _login(user: IUserInfo) {
  return await api({
    method: "POST",
    url: "auth/login",
    data: user
  })
}

/**
 * @description: 注册请求
 * @param {IUserInfo} user
 * @return {*}
 */
export async function _regist(user: IUserInfo) {
  return await api({
    method: "POST",
    url: "auth/regist",
    data: user
  })
}

/**
 * @description: 获取注册验证码
 * @param {*}
 * @return {*}
 */
export async function _captcha(id?: string) {
  const nid: string = id ? id : '-1'
  return await api({
    method: "GET",
    url: `auth/captcha/{${nid}}`,
  })
}

/**
 * @description: 验证注册验证码
 * @param {object} captcha
 * @return {*}
 */
export async function _verify(captcha: ICaptcha) {
  return await api({
    method: "POST",
    url: "auth/verify",
    data: captcha                                
  })
}
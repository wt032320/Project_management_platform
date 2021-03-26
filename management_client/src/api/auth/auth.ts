/**
 * @description: 用户登录表
 * @param {*}
 * @return {*}
 */

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
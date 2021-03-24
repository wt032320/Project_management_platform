/**
 * @description: 用户登录表
 * @param {*}
 * @return {*}
 */

import api from '..';

interface ILogin {
  phone: string;
  password: string;
}

/**
 * @description: 登录请求
 * @param {ILogin} user
 * @return {*}
 */
export async function _login(user: ILogin) {
  return await api({
    method: "POST",
    url: "auth/login",
    data: user
  })
}

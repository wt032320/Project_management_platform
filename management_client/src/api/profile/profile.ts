import { IUserinfo } from '@/typings';
import api from '..';

// 获取用户信息请求
export async function _profile(id: string) {
  return await api({
    method: 'POST',
    url: `profile/getinfo/${id}`
  })
}

// 更新用户信息接口
export async function _updateInfo(userInfo: IUserinfo) {
  return await api({
    method: 'POST',
    url: `profile/add`,
    data: userInfo
  })
}
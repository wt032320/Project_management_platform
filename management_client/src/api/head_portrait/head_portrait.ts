import { IPhoto } from '@/typings';
import api from '..';

// 上传用户头像请求
export async function _photo(userImage: IPhoto) {
  return await api({
    method: 'POST',
    url: 'photo/upload',
    data: userImage
  })
}
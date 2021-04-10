import api from '..';


export async function _profile(id: string) {
  return await api({
    method: 'POST',
    url: `profile/getinfo/${id}`
  })
}
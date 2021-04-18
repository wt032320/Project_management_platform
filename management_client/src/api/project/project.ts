import api from '..';

/**
 * @description: 获取当前用户所有项目
 * @param {number} page
 * @return {*}
 */
export async function _project(page?: number = 1) {
  return await api({
    method: "GET",
    url: `project/projects/${localStorage.getItem('userid')}/${page}`
  })
}

export async function _delete(id: string) {
  return await api({
    method: 'POST',
    url: `project/delete/${id}`
  })
}
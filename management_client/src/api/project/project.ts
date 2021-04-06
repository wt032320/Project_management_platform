import api from '..';

export async function _project(page?: number = 1) {
  return await api({
    method: "GET",
    url: `project/projects/${localStorage.getItem('userid')}/${page}`
  })
}
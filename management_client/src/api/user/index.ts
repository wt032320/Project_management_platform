import api from "..";

export function getHello() {
  return api({
    method: 'GET',
    url: 'users/hello'
  })
}
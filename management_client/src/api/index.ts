import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IResponse {
  code: number;
  msg: any;
}

const baseURL: string = "http://localhost:8000";

const api = axios.create({
  baseURL,
  timeout: 8000,
})

// 请求拦截
api.interceptors.request.use((req: AxiosRequestConfig) => {
  const token: string = localStorage.getItem('token') as string;
  return req;
}, err => console.log(err))

// 响应拦截
api.interceptors.response.use((res: AxiosResponse) => {
  const response: IResponse = res.data;
  if (response.code !== 0) {
    console.warn(response.msg)
  }
  return res.data.msg;
}, err => console.log(err))

export default api
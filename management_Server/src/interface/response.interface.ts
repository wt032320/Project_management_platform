/**
 * @description: 返回报文格式
 * @param {*}
 * @return {*}
 */

export interface IResponse {
  code: number; // 0 成功
  msg: any;
  projectId?: string; // 项目id
}
/**
 * @description: 获取当前日期
 * @param {*}
 * @return {*}
 */

export function getNowDate(): string {

  const today = new Date()
  const year: number = today.getFullYear()
  const month: number = today.getMonth()
  const day: number = today.getDate()
  const hour: number = today.getHours()
  const minute: number = today.getMinutes()
  const second: number = today.getSeconds()

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}
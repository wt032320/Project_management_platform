import * as crypto from 'crypto';

export function addSalt() {
  return crypto.randomBytes(3).toString('base64')
}

export function encript(userPassword: string, salt: string): string {
  // .pbkdf2Sync() 为crypto库的内置加密方法
  // salt: 密言 10000: 加密迭代次数 16: 导出加密后密码长度 'sha256': 加密方式
  return crypto.pbkdf2Sync(userPassword, salt, 10000, 16, 'sha256').toString('base64');
}
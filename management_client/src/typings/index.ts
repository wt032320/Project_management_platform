interface IEvent {
  event: string;
}

// 用户注册数据接口
interface INuser {
  phone: string;
  password: string;
  repassword: string;
  isAgree: boolean;
  captcha: string;
  captchas: any;
}

// 用户登录数据接口
interface IUser {
  phone: string;
  password: string;
  isAgree: boolean;
}

interface IState {
  list: IEvent[];
}

// 校验验证码数据接口
interface ICaptcha {
  captcha: string; 
  id: string;
}

// 用户个人信息接口
interface IUserinfo {
  nickname: string;
  company: string;
  sign?: string;
  area?: string;
  id?: string;
}

// 用户头像信息接口
interface IPhoto {
  id: string;
  photo: string;
}

export  {
  IEvent,
  IUser,
  INuser,
  IState,
  ICaptcha,
  IUserinfo,
  IPhoto
}
interface IEvent {
  event: string;
}

interface INuser {
  phone: string;
  password: string;
  repassword: string;
  isAgree: boolean;
  captcha: string;
  captchas: object;
}

interface IUser {
  phone: string;
  password: string;
  isAgree: boolean;
}

interface IState {
  list: IEvent[];
}

export  {
  IEvent,
  IUser,
  INuser,
  IState,
}
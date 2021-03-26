interface IEvent {
  event: string;
}

interface INuser {
  phone: string;
  password: string;
  repassword: string;
  isAgree: boolean;
  captcha: string;
}

interface IUser {
  phone: string;
  password: string;
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
interface IEvent {
  event: string;
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
  IState,
}
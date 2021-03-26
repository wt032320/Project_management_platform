import { IEvent, IState } from '@/typings';
import store from '.';
import { SETEVENT } from './actionType';

export default {
  [SETEVENT](state: IState, eventName: IEvent): void {
    state.list = [eventName, ...state.list]
  }
}
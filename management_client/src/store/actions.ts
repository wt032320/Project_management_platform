import { IEvent, IState } from '../typings/index';
import { SETEVENT } from './actionType';
import { Commit } from 'vuex';

interface ICtx {
  commit: Commit;
  state: IState;
}

export default {
  [SETEVENT]({ commit }: ICtx, event: IEvent): void {
    commit(SETEVENT, event)
  }
}
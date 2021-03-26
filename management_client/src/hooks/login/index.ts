
import { IEvent } from "@/typings";
import { Store, useStore } from 'vuex';
import { SETEVENT } from '../../store/actionType';

const store: Store<any> = useStore()

function setEvent(eventName: string): void {
  const event: IEvent = {
    event: eventName
  }
  store.dispatch(SETEVENT, event)
}

export default {
  setEvent
}
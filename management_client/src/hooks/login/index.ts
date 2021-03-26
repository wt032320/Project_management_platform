
import { IEvent } from "@/typings";
import { Store, useStore } from 'vuex';
import { SETEVENT } from '../../store/actionType';

interface IUse {
  setEvent: (value: IEvent) => void;
}

function useEvent(): IUse {
  const store: Store<any> = useStore()

  function setEvent(eventName: string): void {
    const event: IEvent = {
      event: eventName
    }
    store.dispatch(SETEVENT, event)
  }

  return  {
    setEvent
  }

}


export {
  useEvent,
  IUse,
}
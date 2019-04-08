import { EventList } from './event.data';
import { EventActions } from './event.actions';
import { PayloadAction } from '../payload-action';
import { State } from '@angular-redux/form/dist/source/state';
import { isNullOrUndefined } from 'util';

const INITIAL_STATE: EventList = {
  order: [],
  byId: {},
  loading: false,
  error: null
};

export function eventReducer(state: EventList = INITIAL_STATE, action: PayloadAction<any, any>) {
  switch (action.type) {
    case EventActions.EVENTS_LOAD_START: {
      return State.assign(state, [], {
        order: [],
        byId: {},
        loading: true,
        error: null
      });
    }
    case EventActions.EVENTS_LOAD_FAILED: {
      return State.assign(state, [], {
        order: [],
        byId: {},
        loading: false,
        error: action.error
      });
    }
    case EventActions.EVENTS_LOAD_SUCCEEDED: {
      const newState =  {
        order: [],
        byId: {},
        loading: false,
        error: null
      };
      const events = isNullOrUndefined(action.payload) ? [] : action.payload;
      events.forEach((element) => {
        const newElem = JSON.parse(JSON.stringify(element));
        if (newElem.creator) {
          if (newElem.attendants) {
            if (newElem.attendants.attendants) {
              newElem.attendants.attendants.push({id: -1, name: newElem.creator});
            } else {
              newElem.attendants.attendants = [];
              newElem.attendants.attendants.push({id: -1, name: newElem.creator});
            }
          } else {
            newElem['attendants'] = {};
            newElem.attendants['attendants'] = [];
            newElem.attendants.attendants.push({id: -1, name: newElem.creator});
          }
        }
        newElem.deleted = false;
        newState.order.push(newElem.id + '');
        newState.byId[newElem.id] = newElem;
      });
      return newState;
    }
    default: {
      return state;
    }
  }
}

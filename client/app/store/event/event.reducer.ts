import { EventList, TeamEvent } from './event.data';
import { EventActions } from './event.actions';
import { PayloadAction } from '../payload-action';
import { State } from '@angular-redux/form/dist/source/state';
import { isNullOrUndefined } from 'util';

const INITIAL_STATE: EventList = {
  order: [],
  byId: {},
  loading: false,
  saving: false,
  deleting: false,
  saveSuccess: false,
  deleteSuccess: false,
  error: null
};

export function eventReducer(state: EventList = INITIAL_STATE, action: PayloadAction<any, any>) {
  switch (action.type) {
    case EventActions.EVENTS_LOAD_START: {
      return State.assign(state, [], {
        order: [],
        byId: {},
        loading: true,
        saving: false,
        deleting: false,
        saveSuccess: false,
        deleteSuccess: false,
        error: null
      });
    }
    case EventActions.EVENTS_LOAD_FAILED: {
      return State.assign(state, [], {
        order: [],
        byId: {},
        loading: false,
        saving: false,
        deleting: false,
        saveSuccess: false,
        deleteSuccess: false,
        error: action.error
      });
    }
    case EventActions.EVENTS_LOAD_SUCCEEDED: {
      const newState =  {
        order: [],
        byId: {},
        loading: false,
        saving: false,
        deleting: false,
        saveSuccess: false,
        deleteSuccess: false,
        error: null
      };
      const events = isNullOrUndefined(action.payload) ? [] : action.payload
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
    case EventActions.EVENTS_SAVE_START: {
      return State.assign(state, [], {error: null, saving: true, saveSuccess: false, deleting: false, deleteSuccess: false});
    }
    case EventActions.EVENTS_SAVE_FAILED: {
      return State.assign(state, [], {error: action.error, saving: false, saveSuccess: false, deleting: false, deleteSuccess: false});
    }
    case EventActions.EVENTS_SAVE_SUCCEEDED: {
      const nextState = JSON.parse(JSON.stringify(state));
      if (TeamEvent.isTemporaryId(action.payload.oldEventId)) {
        nextState.order.push(action.payload.eventData.id + '');
        nextState.byId[action.payload.eventData.id] = action.payload.eventData;
      } else {
        const updatedEvent = JSON.parse(JSON.stringify(action.payload.eventData));
        if (updatedEvent.attendants && !updatedEvent.attendants.hasOwnProperty('attendants')) {
          delete updatedEvent.attendants;
        }
        updatedEvent.deleted = false;
        nextState.byId[action.payload.eventData.id] = Object.assign({}, nextState.byId[action.payload.eventData.id], updatedEvent);
      }
      nextState.saving = false;
      nextState.error = null;
      nextState.saveSuccess = true;
      return nextState;
    }
    case EventActions.EVENTS_DELETE_START: {
      return State.assign(state, [], {error: null, deleting: true, deleteSuccess: false});
    }
    case EventActions.EVENTS_DELETE_FAILED: {
      return State.assign(state, [], {error: action.error, deleting: false, deleteSuccess: false});
    }
    case EventActions.EVENTS_DELETE_SUCCEEDED: {
      const nextState = JSON.parse(JSON.stringify(state));
      const oldIdIndex = nextState.order.indexOf(action.payload.oldEventId + '');
      nextState.order.splice(oldIdIndex, 1);
      nextState.byId[action.payload.oldEventId].deleted = true;
      nextState.deleteSuccess = action.payload.eventData;
      nextState.deleting = false;
      return nextState;
    }
    case EventActions.EVENTS_ADD: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.order.push(action.payload.id + '');
      newState.byId[action.payload.id] = JSON.parse(JSON.stringify(action.payload));
      return newState;
    }
    default: {
      return state;
    }
  }
}

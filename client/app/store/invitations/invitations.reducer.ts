import { InvitationList } from './invitations.data';
import { PayloadAction } from '../payload-action';
import { InvitationsActions } from './invitations.actions';
import { State } from '@angular-redux/form/dist/source/state';
import { isNullOrUndefined } from 'util';

const INITIAL_STATE: InvitationList = {
  order: [],
  byId: {},
  loading: false,
  responding: false,
  respondSuccess: false,
  error: null
};

export function invitationReducer(state: InvitationList = INITIAL_STATE, action: PayloadAction<any, any>) {
  switch (action.type) {
    case InvitationsActions.INVITATIONS_LOAD_START: {
      return State.assign(state, [], {
        order: [],
        byId: {},
        loading: true,
        responding: false,
        respondSuccess: false,
        error: null
      });
    }
    case InvitationsActions.INVITATIONS_LOAD_FAILED: {
      return State.assign(state, [], {
        order: [],
        byId: {},
        loading: false,
        responding: false,
        respondSuccess: false,
        error: action.error
      });
    }
    case InvitationsActions.INVITATIONS_LOAD_SUCCEEDED: {
      const newState =  {
        order: [],
        byId: {},
        loading: false,
        responding: false,
        respondSuccess: false,
        error: null
      };
      const invitations = isNullOrUndefined(action.payload) ? [] : action.payload;
      invitations.forEach((element) => {
        const newElem = JSON.parse(JSON.stringify(element));
        if (newElem.creator) {
          if (newElem.event.attendants) {
            if (newElem.event.attendants.attendants) {
              newElem.event.attendants.attendants.push({id: -1, name: newElem.creator});
            } else {
              newElem.event.attendants.attendants = [];
              newElem.event.attendants.attendants.push({id: -1, name: newElem.creator});
            }
          } else {
            newElem.event['attendants'] = {};
            newElem.event.attendants['attendants'] = [];
            newElem.event.attendants.attendants.push({id: -1, name: newElem.creator});
          }
        }
        newState.order.push(newElem.id + '');
        newState.byId[newElem.id] = newElem;
      });
      return newState;
    }
    case InvitationsActions.INVITATIONS_RESPONSE_START: {
      return State.assign(state, [], {error: null, responding: true, respondSuccess: false});
    }
    case InvitationsActions.INVITATIONS_RESPONSE_FAILED: {
      return State.assign(state, [], {error: action.error, responding: false, respondSuccess: false});
    }
    case InvitationsActions.INVITATIONS_RESPONSE_SUCCEEDED: {
      const nextState = JSON.parse(JSON.stringify(state));
      const oldIdIndex = nextState.order.indexOf(action.payload.oldInvitationId + '');
      nextState.order.splice(oldIdIndex, 1);
      // delete nextState.byId[action.payload.oldEventId];
      nextState.respondSuccess = action.payload.eventData;
      nextState.responding = false;
      return nextState;
    }
    default: {
      return state;
    }
  }
}

import { LogOutData } from './logout.data';
import { PayloadAction } from '../payload-action';
import { State } from '@angular-redux/form/dist/source/state';
import { LogoutActions } from './logout.actions';

const INITIAL_STATE: LogOutData = {
  loggedOut: false,
  loading: false,
  error: null,
};

export function logoutReducer(state: LogOutData = INITIAL_STATE, action: PayloadAction<any, string>) {
  switch (action.type) {
    case LogoutActions.LOGOUT_STARTED : {
      return State.assign(state, [], {
        loggedOut: false,
        loading: true,
        error: null,
      });
    }
    case LogoutActions.LOGOUT_SUCCEEDED: {
      return State.assign(state, [], {
        loggedOut: action.payload,
        loading: false,
        error: null,
      });
    }
    case LogoutActions.LOGOUT_FAILED: {
      return State.assign(state, [], {
        loggedOut: false,
        loading: false,
        error: action.error,
      });
    }
    default: {
      return state;
    }
  }
}

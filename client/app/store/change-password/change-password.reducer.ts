import { ChangePasswordData } from './change-password.data';
import { PayloadAction } from '../payload-action';
import { ChangePasswordActions } from './change-password.actions';
import { State } from '@angular-redux/form/dist/source/state';

const INITIAL_STATE: ChangePasswordData = {
  changed: false,
  loading: false,
  error: null,
};

export function changePasswordReducer(state: ChangePasswordData = INITIAL_STATE, action: PayloadAction<any, string>) {
  switch (action.type) {
    case ChangePasswordActions.CHANGE_STARTED : {
      return State.assign(state, [], {
        loggedIn: false,
        loading: true,
        error: null,
      });
    }
    case ChangePasswordActions.CHANGE_SUCCEDED: {
      return State.assign(state, [], {
        loggedIn: action.payload,
        loading: false,
        error: null,
      });
    }
    case ChangePasswordActions.CHANGE_FAILED: {
      return State.assign(state, [], {
        loggedIn: false,
        loading: false,
        error: action.error,
      });
    }
    default: {
      return state;
    }
  }
}

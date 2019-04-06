import { LoginData } from './login.data';
import { LoginActions } from './login.actions';
import { State } from '@angular-redux/form/dist/source/state';
import { PayloadAction } from '../payload-action';

const INITIAL_STATE: LoginData = {
  loggedIn: false,
  loading: false,
  error: null,
};

export function loginReducer(state: LoginData = INITIAL_STATE, action: PayloadAction<any, string>) {
  switch (action.type) {
    case LoginActions.LOGIN_STARTED : {
      return State.assign(state, [], {
        loggedIn: false,
        loading: true,
        error: null,
      });
    }
    case LoginActions.LOGIN_SUCCEEDED: {
      return State.assign(state, [], {
        loggedIn: action.payload,
        loading: false,
        error: null,
      });
    }
    case LoginActions.LOGIN_FAILED: {
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

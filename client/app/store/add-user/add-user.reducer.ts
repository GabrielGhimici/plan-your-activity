import { AddUserData } from './add-user.data';
import { AddUserActions } from './add-user.actions';
import { State } from '@angular-redux/form/dist/source/state';
import { PayloadAction } from '../payload-action';

const INITIAL_STATE: AddUserData = {
  added: false,
  loading: false,
  error: null,
};

export function addUserReducer(state: AddUserData = INITIAL_STATE, action: PayloadAction<any, string>) {
  switch (action.type) {
    case AddUserActions.ADD_STARTED : {
      return State.assign(state, [], {
        added: false,
        loading: true,
        error: null,
      });
    }
    case AddUserActions.ADD_SUCCEDED: {
      return State.assign(state, [], {
        added: action.payload,
        loading: false,
        error: null,
      });
    }
    case AddUserActions.ADD_FAILED: {
      return State.assign(state, [], {
        added: false,
        loading: false,
        error: action.error,
      });
    }
    case AddUserActions.ADD_RESET_STATE: {
      return State.assign(state, [], {
        added: false,
        loading: false,
        error: null,
      });
    }
    default: {
      return state;
    }
  }
}

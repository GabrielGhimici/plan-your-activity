import { UserData } from './user-data';
import { PayloadAction } from '../payload-action';
import { UserDataActions } from './user-data.actions';
import { State } from '@angular-redux/form/dist/source/state';

const INITIAL_STATE: UserData = {
  userProfile: null,
  loading: false,
  error: null
};
export function userDataReducer(state: UserData = INITIAL_STATE, action: PayloadAction<any, any>) {
  switch (action.type) {
    case UserDataActions.USER_DATA_LOAD_STARTED:
      return State.assign(state, [], {
        userProfile: null,
        loading: true,
        error: null
      });
    case UserDataActions.USER_DATA_LOAD_FAILED:
      return State.assign(state, [], {
        userProfile: null,
        loading: false,
        error: action.error
      });
    case UserDataActions.USER_DATA_LOAD_SUCCEDED:
      return State.assign(state, [], {
        userProfile: action.payload,
        loading: false,
        error: null
      });
    default:
      return state;
  }
}

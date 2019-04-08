import { ColeaguesData } from './colleagues.data';
import { PayloadAction } from '../payload-action';
import { ColleaguesActions } from './colleagues.actions';
import { State } from '@angular-redux/form/dist/source/state';
import { isNullOrUndefined } from 'util';

const INITIAL_STATE: ColeaguesData = {
  items: [],
  loading: false,
  error: null
};
export function colleaguesDataReducer(state: ColeaguesData = INITIAL_STATE, action: PayloadAction<any, any>) {
  switch (action.type) {
    case ColleaguesActions.COLLEAGUES_DATA_LOAD_STARTED:
      return State.assign(state, [], {
        items: [],
        loading: true,
        error: null
      });
    case ColleaguesActions.COLLEAGUES_DATA_LOAD_FAILED:
      return State.assign(state, [], {
        items: [],
        loading: false,
        error: action.error
      });
    case ColleaguesActions.COLLEAGUES_DATA_LOAD_SUCCEDED: {
      const users = isNullOrUndefined(action.payload) ? [] : action.payload
      return State.assign(state, [], {
        items: users,
        loading: false,
        error: null
      });
    }
    default:
      return state;
  }
}

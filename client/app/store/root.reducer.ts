import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { loginReducer } from './login/login.reducer';
import { logoutReducer } from './logout/logout.reducer';
import { userDataReducer } from './user-data/user-data.reducer';

export const rootReducer = combineReducers({
  router: routerReducer,
  loginData: loginReducer,
  logoutData: logoutReducer,
  userData: userDataReducer
});


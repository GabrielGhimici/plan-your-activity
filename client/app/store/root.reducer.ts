import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { loginReducer } from './login/login.reducer';

export const rootReducer = combineReducers({
  router: routerReducer,
  loginData: loginReducer
});


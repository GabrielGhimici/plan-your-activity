import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { loginReducer } from './login/login.reducer';
import { logoutReducer } from './logout/logout.reducer';
import { userDataReducer } from './user-data/user-data.reducer';
import { changePasswordReducer } from './change-password/change-password.reducer';
import { addUserReducer } from './add-user/add-user.reducer';

export const rootReducer = combineReducers({
  router: routerReducer,
  loginData: loginReducer,
  logoutData: logoutReducer,
  userData: userDataReducer,
  changePasswordData: changePasswordReducer,
  addUserData: addUserReducer,
});


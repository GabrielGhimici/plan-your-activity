import { Injectable } from '@angular/core';

@Injectable()
export class LogoutActions {
  public static readonly LOGOUT_STARTED = '[LOGOUT_ACTIONS]LOGOUT_STARTED';
  public static readonly LOGOUT_SUCCEEDED = '[LOGOUT_ACTIONS]LOGOUT_SUCCEEDED';
  public static readonly LOGOUT_FAILED = '[LOGOUT_ACTIONS]LOGOUT_FAILED';

  constructor() {}

  startLogout() {
    return {
      type: LogoutActions.LOGOUT_STARTED,
    };
  }

  logoutSucceeded(loginData: any) {
    return {
      type: LogoutActions.LOGOUT_SUCCEEDED,
      payload: loginData
    };
  }

  logoutFailed(error: any) {
    return {
      type: LogoutActions.LOGOUT_FAILED,
      error
    };
  }
}

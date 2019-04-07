import { Injectable } from '@angular/core';

@Injectable()
export class ChangePasswordActions {
  public static readonly CHANGE_STARTED = '[CHANGE_PASSWORD_ACTIONS]CHANGE_STARTED';
  public static readonly CHANGE_SUCCEDED = '[CHANGE_PASSWORD_ACTIONS]CHANGE_SUCCEDED';
  public static readonly CHANGE_FAILED = '[CHANGE_PASSWORD_ACTIONS]CHANGE_FAILED';

  constructor() {}

  startChange(userData: any) {
    return {
      type: ChangePasswordActions.CHANGE_STARTED,
      payload: userData
    };
  }

  changeSucceded(loginData: any) {
    return {
      type: ChangePasswordActions.CHANGE_SUCCEDED,
      payload: loginData
    };
  }

  changeFailed(error: any) {
    return {
      type: ChangePasswordActions.CHANGE_FAILED,
      error
    };
  }
}

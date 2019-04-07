import { Injectable } from '@angular/core';

@Injectable()
export class AddUserActions {
  public static readonly ADD_STARTED = '[ADD_USER_ACTIONS]ADD_STARTED';
  public static readonly ADD_SUCCEDED = '[ADD_USER_ACTIONS]ADD_SUCCEDED';
  public static readonly ADD_FAILED = '[ADD_USER_ACTIONS]ADD_FAILED';
  public static readonly ADD_RESET_STATE = '[ADD_USER_ACTIONS]ADD_RESET_STATE';

  constructor() {}

  startAdding(userData: any) {
    return {
      type: AddUserActions.ADD_STARTED,
      payload: userData
    };
  }

  addingSucceded(addedData: any) {
    return {
      type: AddUserActions.ADD_SUCCEDED,
      payload: addedData
    };
  }

  addingFailed(error: any) {
    return {
      type: AddUserActions.ADD_FAILED,
      error
    };
  }
  resetState() {
    return {
      type: AddUserActions.ADD_RESET_STATE
    };
  }
}

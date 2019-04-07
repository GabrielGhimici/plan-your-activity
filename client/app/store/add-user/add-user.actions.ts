import { Injectable } from '@angular/core';

@Injectable()
export class AddUserActions {
  public static readonly ADD_STARTED = '[ADD_USER_ACTIONS]ADD_STARTED';
  public static readonly ADD_SUCCEDED = '[ADD_USER_ACTIONS]ADD_SUCCEDED';
  public static readonly ADD_FAILED = '[ADD_USER_ACTIONS]ADD_FAILED';

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
}

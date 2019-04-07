import { Injectable } from '@angular/core';

@Injectable()
export class UserDataActions {
  static readonly USER_DATA_LOAD_STARTED = '[USER_DATA]LOAD_STARTED';
  static readonly USER_DATA_LOAD_SUCCEDED = '[USER_DATA]LOAD_SUCCEDED';
  static readonly USER_DATA_LOAD_FAILED = '[USER_DATA]LOAD_FAILED';

  loadUserData() {
    return {
      type: UserDataActions.USER_DATA_LOAD_STARTED
    };
  }

  userDataLoadingSucceded(payload) {
    return {
      type: UserDataActions.USER_DATA_LOAD_SUCCEDED,
      payload
    };
  }

  userDataLoadingFailed(error) {
    return {
      type: UserDataActions.USER_DATA_LOAD_FAILED,
      error
    };
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class ColleaguesActions {
  static readonly COLLEAGUES_DATA_LOAD_STARTED = '[COLLEAGUES_DATA]LOAD_STARTED';
  static readonly COLLEAGUES_DATA_LOAD_SUCCEDED = '[COLLEAGUES_DATA]LOAD_SUCCEDED';
  static readonly COLLEAGUES_DATA_LOAD_FAILED = '[COLLEAGUES_DATA]LOAD_FAILED';

  loadColleaguesData() {
    return {
      type: ColleaguesActions.COLLEAGUES_DATA_LOAD_STARTED
    };
  }

  colleaguesDataLoadingSucceded(payload) {
    return {
      type: ColleaguesActions.COLLEAGUES_DATA_LOAD_SUCCEDED,
      payload
    };
  }

  colleaguesDataLoadingFailed(error) {
    return {
      type: ColleaguesActions.COLLEAGUES_DATA_LOAD_FAILED,
      error
    };
  }
}

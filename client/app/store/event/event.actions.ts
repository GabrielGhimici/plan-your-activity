import {Injectable} from '@angular/core';

@Injectable()
export class EventActions {
  public static readonly EVENTS_LOAD_START = '[EVENT_MANIPULATION]EVENTS_LOAD_START';
  public static readonly EVENTS_LOAD_FAILED = '[EVENT_MANIPULATION]EVENTS_LOAD_FAILED';
  public static readonly EVENTS_LOAD_SUCCEEDED = '[EVENT_MANIPULATION]EVENTS_LOAD_SUCCEEDED';

  constructor() {}

  startLoadingEvents() {
    return {
      type: EventActions.EVENTS_LOAD_START
    };
  }

  eventsLoadingSucceded(loginData: any) {
    return {
      type: EventActions.EVENTS_LOAD_SUCCEEDED,
      payload: loginData
    };
  }

  eventsLoadingFailed(error: any) {
    return {
      type: EventActions.EVENTS_LOAD_FAILED,
      error
    };
  }
}

import {Injectable} from '@angular/core';

@Injectable()
export class EventActions {
  public static readonly EVENTS_LOAD_START = '[EVENT_MANIPULATION]EVENTS_LOAD_START';
  public static readonly EVENTS_LOAD_FAILED = '[EVENT_MANIPULATION]EVENTS_LOAD_FAILED';
  public static readonly EVENTS_LOAD_SUCCEEDED = '[EVENT_MANIPULATION]EVENTS_LOAD_SUCCEEDED';
  public static readonly EVENTS_SAVE_START = '[EVENT_MANIPULATION]EVENTS_SAVE_START';
  public static readonly EVENTS_SAVE_FAILED = '[EVENT_MANIPULATION]EVENTS_SAVE_FAILED';
  public static readonly EVENTS_SAVE_SUCCEEDED = '[EVENT_MANIPULATION]EVENTS_SAVE_SUCCEEDED';
  public static readonly EVENTS_DELETE_START = '[EVENT_MANIPULATION]EVENTS_DELETE_START';
  public static readonly EVENTS_DELETE_FAILED = '[EVENT_MANIPULATION]EVENTS_DELETE_FAILED';
  public static readonly EVENTS_DELETE_SUCCEEDED = '[EVENT_MANIPULATION]EVENTS_DELETE_SUCCEEDED';
  public static readonly EVENTS_ADD = '[EVENT_MANIPULATION]EVENTS_ADD';

  constructor() {}

  startLoadingEvents() {
    return {
      type: EventActions.EVENTS_LOAD_START
    };
  }

  addEvent(event: any) {
    return {
      type: EventActions.EVENTS_ADD,
      payload: event
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

  eventSaveStart(eventData: any) {
    return {
      type: EventActions.EVENTS_SAVE_START,
      payload: eventData
    };
  }

  eventSaveFailed(error: any) {
    return {
      type: EventActions.EVENTS_SAVE_FAILED,
      error
    };
  }

  eventSaveSucceeded(eventData: any, oldEventId: any) {
    return {
      type: EventActions.EVENTS_SAVE_SUCCEEDED,
      payload: {
        eventData,
        oldEventId
      }
    };
  }

  eventDeleteStart(eventData: any) {
    return {
      type: EventActions.EVENTS_DELETE_START,
      payload: eventData
    };
  }

  eventDeleteFailed(error: any) {
    return {
      type: EventActions.EVENTS_DELETE_FAILED,
      error
    };
  }

  eventDeleteSucceeded(eventData: any, oldEventId: any) {
    return {
      type: EventActions.EVENTS_DELETE_SUCCEEDED,
      payload: {
        eventData,
        oldEventId
      }
    };
  }
}

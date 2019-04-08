import { Injectable } from '@angular/core';
import { EventService } from '../../core/event/event.service';
import { EventActions } from './event.actions';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class EventEpic {

  constructor(
    private eventService: EventService,
    private eventActions: EventActions
  ) {}

  public createEpic() {
    return createEpicMiddleware(
      combineEpics(
        this.eventsLoadEpic()
      )
    );
  }

  private eventsLoadEpic() {
    return action$ => action$
      .ofType(EventActions.EVENTS_LOAD_START)
      .switchMap(action => this.eventService.getEvents()
        .map(data => this.eventActions.eventsLoadingSucceded(data['events']))
        .catch(error => Observable.of(this.eventActions.eventsLoadingFailed(error)))
      );
  }
}

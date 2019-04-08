import { Injectable } from '@angular/core';
import { EventService } from '../../core/event/event.service';
import { EventActions } from './event.actions';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { InvitationsActions } from '../invitations/invitations.actions';

@Injectable()
export class EventEpic {

  constructor(
    private eventService: EventService,
    private eventActions: EventActions
  ) {}

  public createEpic() {
    return createEpicMiddleware(
      combineEpics(
        this.eventsLoadEpic(),
        this.eventSaveEpic(),
        this.eventDeleteEpic(),
        this.updateEvents()
      )
    );
  }

  private eventsLoadEpic() {
    return action$ => action$
      .ofType(EventActions.EVENTS_LOAD_START)
      .switchMap(action => this.eventService.getEvents()
        .map(data => this.eventActions.eventsLoadingSucceded(data['events']))
        .catch(error =>  Observable.of(this.eventActions.eventsLoadingFailed(error)))
      );
  }

  private eventSaveEpic() {
    return action$ => action$
      .ofType(EventActions.EVENTS_SAVE_START)
      .switchMap(action => {
        const currentEventId = action.payload.id;
        return this.eventService.saveEvent(action.payload)
          .map(data => {
            if (!data.hasOwnProperty('attendants')) {
              data['attendants'] = {};
            }
            return this.eventActions.eventSaveSucceeded(data, currentEventId);
          })
          .catch(error => Observable.of(this.eventActions.eventSaveFailed(error)));
      });
  }

  private eventDeleteEpic() {
    return action$ => action$
      .ofType(EventActions.EVENTS_DELETE_START)
      .switchMap(action => {
        const currentEventId = action.payload.id;
        delete action.payload.attendants;
        return this.eventService.deleteEvent(action.payload)
          .map(data => this.eventActions.eventDeleteSucceeded(data['OK'], currentEventId))
          .catch(error => Observable.of(this.eventActions.eventDeleteFailed(error)));
      });
  }

  private updateEvents() {
    return (action$, store) => action$
      .ofType(InvitationsActions.INVITATIONS_RESPONSE_SUCCEEDED)
      .filter(action => action.payload.statusData === 1)
      .switchMap(action => {
        const newEvent = JSON.parse(JSON.stringify(action.payload.eventData));
        if (!newEvent.attendants) {
          newEvent.attendants = {};
        } else {
          if (newEvent.attendants.attendants) {
            newEvent.attendants.attendants.push({id: -1, name: store.getState().userData.userProfile.name});
          } else {
            newEvent.attendants.attendants = [];
            newEvent.attendants.attendants.push({id: -1, name: store.getState().userData.userProfile.name});
          }

        }
        return Observable.of(this.eventActions.addEvent(newEvent));
      });
  }
}

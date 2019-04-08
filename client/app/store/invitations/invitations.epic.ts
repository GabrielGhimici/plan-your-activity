import { Injectable } from '@angular/core';
import { EventService } from '../../core/event/event.service';
import { InvitationsActions } from './invitations.actions';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class InvitationsEpic {

  constructor(
    private eventService: EventService,
    private invitationActions: InvitationsActions
  ) {}

  public createEpic() {
    return createEpicMiddleware(
      combineEpics(
        this.invitationsLoadEpic(),
        this.invitationResponseEpic()
      )
    );
  }

  private invitationsLoadEpic() {
    return action$ => action$
      .ofType(InvitationsActions.INVITATIONS_LOAD_START)
      .switchMap(action => this.eventService.getInvitations()
        .map(data => this.invitationActions.invitationsLoadingSucceded(data['invitations']))
        .catch(error =>  Observable.of(this.invitationActions.invitationsLoadingFailed(error)))
      );
  }

  private invitationResponseEpic() {
    return action$ => action$
      .ofType(InvitationsActions.INVITATIONS_RESPONSE_START)
      .switchMap(action => {
        const currentInvitationId = action.payload.invitationData.id;
        const currentEvent = action.payload.invitationData.event;
        return this.eventService.respondInvitation({id: action.payload.invitationData.id, response: action.payload.status})
          .map(data => this.invitationActions.invitationResponseSucceeded(action.payload.status, currentEvent, currentInvitationId))
          .catch(error => Observable.of(this.invitationActions.invitationResponseFailed(error)));
      });
  }
}

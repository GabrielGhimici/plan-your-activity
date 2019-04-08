import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamEvent } from '../../store/event/event.data';

@Injectable()
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getEvents() {
    return this.http.get('api/events');
  }

  getInvitations() {
    return this.http.get('api/events/invitations');
  }

  saveEvent(eventData: any) {
    if (TeamEvent.isTemporaryId(eventData.id)) {
      delete eventData.id;
      return this.http.put('api/events/addEvent', eventData);
    } else {
      return this.http.put('api/events/updateEvent', eventData);
    }
  }

  deleteEvent(eventData: any) {
    return this.http.put('/api/events/deleteEvent', eventData);
  }

  respondInvitation(invitationData: any) {
    return this.http.put('/api/events/respond', invitationData);
  }
}

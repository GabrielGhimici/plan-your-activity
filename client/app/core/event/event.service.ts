import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getEvents() {
    return this.http.get('api/events');
  }

}

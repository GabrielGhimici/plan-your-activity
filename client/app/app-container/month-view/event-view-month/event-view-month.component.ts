import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';

@Component({
  selector: 'app-event-view-month',
  templateUrl: './event-view-month.component.html',
  styleUrls: ['./event-view-month.component.scss']
})
export class EventViewMonthComponent implements OnInit {
  public formattedData: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EventViewMonthComponent>,
  ) {
    this.formattedData = data.events.filter((value: any) => !isNullOrUndefined(value)).map((event: any) => {
      const eventData = {};
      eventData['id'] = event.id;
      eventData['description'] = event.description;
      eventData['dateInterval'] = `${
        moment(event.start_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
      } - ${
        moment(event.finish_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
      }`;
      eventData['timeInterval'] = `${event.start_time} - ${event.finish_time}`;
      eventData['attendants'] = event.attendants.hasOwnProperty('attendants') ? event.attendants.attendants : [];
      return eventData;
    });
  }

  ngOnInit() {}
}

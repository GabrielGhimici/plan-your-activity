import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
  public formattedData: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EventViewComponent>
  ) {
    if (data && !_.isEmpty(data.event)) {
      this.formattedData.id = data.event.id;
      this.formattedData.description = data.event.description;
      this.formattedData.dateInterval = `${
        moment(data.event.start_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
        } - ${
        moment(data.event.finish_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
        }`;
      this.formattedData.timeInterval = `${data.event.start_time} - ${data.event.finish_time}`;
      this.formattedData.attendants = data.event.attendants.hasOwnProperty('attendants') ? data.event.attendants.attendants : [];
    }
  }

  ngOnInit() {}
}

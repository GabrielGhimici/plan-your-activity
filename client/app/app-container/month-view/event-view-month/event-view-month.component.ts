import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { dispatch, select } from '@angular-redux/store';
import { EventActions } from '../../../store/event/event.actions';
import { EventManipulationComponent } from '../../event-manipulation/event-manipulation.component';

@Component({
  selector: 'app-event-view-month',
  templateUrl: './event-view-month.component.html',
  styleUrls: ['./event-view-month.component.scss']
})
export class EventViewMonthComponent implements OnInit {
  @select(['events', 'deleting']) deleting$: Observable<any>;
  @select(['events', 'deleteSuccess']) deleteSuccess$: Observable<any>;
  @select(['events', 'error']) error$: Observable<any>;
  public formattedData: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EventViewMonthComponent>,
    private dialog: MatDialog,
    private eventActions: EventActions,
    private matSnackBar: MatSnackBar
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

  ngOnInit() {
  }

  editEvent(eventPosition: any) {
    this.dialogRef.close();
    const newEvent = JSON.parse(JSON.stringify(this.data.events[eventPosition]));
    newEvent.attendants =  newEvent.attendants.hasOwnProperty('attendants') ?
      newEvent.attendants.attendants.map((att: any) => att.id) :
      [];
    this.dialog.open(EventManipulationComponent, {
      height: '550px',
      width: '550px',
      data: { date: this.data.date, event: newEvent },
      autoFocus: false,
      disableClose: true
    });
  }

  deleteEvent(eventPosition: any) {
    this.delete(this.data.events[eventPosition]);
    this.deleteSuccess$
      .filter(value => !isNullOrUndefined(value))
      .subscribe((value: boolean) => {
        if (value) {
          this.matSnackBar.open(
            'Event deleted with success!',
            '',
            {
              duration: 2000
            }
          );
          this.formattedData = this.formattedData.filter((elem: any) => elem.id !== this.data.events[eventPosition].id);
        }
      });
    this.error$
      .filter(value => !isNullOrUndefined(value))
      .subscribe((value: any) => {
        this.matSnackBar.open(
          'Looks like were problems with event delete. Please try again!',
          '',
          {
            duration: 2000
          }
        );
      });
  }

  @dispatch()
  delete(eventData: any) {
    return this.eventActions.eventDeleteStart(eventData);
  }

  canEdit() {
    return moment().isBefore(this.data.date, 'day') || moment().isSame(this.data.date, 'day');
  }
}

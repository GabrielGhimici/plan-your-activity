import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { dispatch, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { EventActions } from '../../../store/event/event.actions';
import { EventManipulationComponent } from '../../event-manipulation/event-manipulation.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
  @select(['events', 'deleting']) deleting$: Observable<any>;
  @select(['events', 'deleteSuccess']) deleteSuccess$: Observable<any>;
  @select(['events', 'error']) error$: Observable<any>;
  public formattedData: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EventViewComponent>,
    public dialog: MatDialog,
    private eventActions: EventActions,
    private matSnackBar: MatSnackBar
  ) {
    this.formattedData.id = data.event.id;
    this.formattedData.description = data.event.description;
    this.formattedData.dateInterval = `${
      moment(data.event.start_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    } - ${
      moment(data.event.finish_date, 'YYYY-MM-DD').format('DD/MM/YYYY'
      )}`;
    this.formattedData.timeInterval = `${data.event.start_time} - ${data.event.finish_time}`;
    this.formattedData.attendants = data.event.attendants.hasOwnProperty('attendants') ? data.event.attendants.attendants : [];
  }

  ngOnInit() {
  }

  editEvent() {
    this.dialogRef.close();
    const newEvent = JSON.parse(JSON.stringify(this.data.event));
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

  deleteEvent() {
    this.delete(this.data.event);
    this.deleteSuccess$
      .filter(value => !isNullOrUndefined(value))
      .subscribe((value: boolean) => {
        if (value) {
          this.dialogRef.close();
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

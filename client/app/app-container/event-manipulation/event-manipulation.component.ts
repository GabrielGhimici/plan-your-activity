import { Component, Inject, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { TeamEvent } from '../../store/event/event.data';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { EventActions } from '../../store/event/event.actions';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-event-manipulation',
  templateUrl: './event-manipulation.component.html',
  styleUrls: ['./event-manipulation.component.scss']
})
export class EventManipulationComponent implements OnInit {
  @select(['colleagues', 'items']) colleagues$: Observable<any>;
  @select(['events', 'saving']) saving$: Observable<any>;
  @select(['events', 'saveSuccess']) saveSuccess$: Observable<any>;
  @select(['events', 'error']) error$: Observable<any>;
  @select(['events']) events$: Observable<any>;
  private allEvents: any = [];
  public eventData: TeamEvent;
  public formattedDate: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EventManipulationComponent>,
    private matSnackBar: MatSnackBar,
    private eventActions: EventActions
  ) {
    if (data.event) {
      this.eventData = JSON.parse(JSON.stringify(data.event));
    } else {
      this.eventData = TeamEvent.createDefault();
      this.eventData.start_date = data.date.format('YYYY-MM-DD');
      this.eventData.finish_date = data.date.format('YYYY-MM-DD');
    }
    this.formattedDate = moment(this.eventData.start_date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    this.events$
      .filter(values => !isNullOrUndefined(values))
      .subscribe((values: any) => {
        values.order.forEach((elem: any) => {
          const eventDay = moment(values.byId[elem].start_date, 'YYYY-MM-DD');
          if (eventDay.isSame(this.data.date, 'day')) {
            this.allEvents.push(values.byId[elem]);
          }
        });
      });
  }

  ngOnInit() {
  }

  conflicts(data1: moment.Moment, data2: moment.Moment, data3: moment.Moment, data4: moment.Moment) {
    return data1.isBetween(data3, data4, null, '[]') ||
      data2.isBetween(data3, data4, null, '[]') ||
      data3.isBetween(data1, data2, null, '[]') ||
      data4.isBetween(data1, data2, null, '[]');
  }

  hasConflicts(event: any) {
    let hasConflicts = false;
    for (let i = 0; i < this.allEvents.length; i++) {
      const currentEventStartDate =
        moment(`${event.start_date} ${event.start_time}`, 'YYYY-MM-DD hh:mm:ss');
      const currentEventFinishDate =
        moment(`${event.finish_date} ${event.finish_time}`, 'YYYY-MM-DD hh:mm:ss');
      const tempEventStartDate =
        moment(`${this.allEvents[i].start_date} ${this.allEvents[i].start_time}`, 'YYYY-MM-DD hh:mm:ss');
      const tempEventFinishDate =
        moment(`${this.allEvents[i].finish_date} ${this.allEvents[i].finish_time}`, 'YYYY-MM-DD hh:mm:ss');
      if (this.conflicts(currentEventStartDate, currentEventFinishDate, tempEventStartDate, tempEventFinishDate) &&
        event.id !== this.allEvents[i].id && !this.allEvents[i].deleted) {
        hasConflicts = true;
        break;
      }
    }
    return hasConflicts;
  }

  saveEvent(eventFormValidation: any, formValue: any) {
    formValue.id = this.eventData.id;
    formValue.start_date = this.eventData.start_date;
    formValue.finish_date = this.eventData.finish_date;
    if (formValue.attendants) {
      formValue.attendants = formValue.attendants.map((uId: any) => uId + '');
    } else {
      formValue.attendants = [];
    }
    if (this.hasConflicts(formValue)) {
      this.matSnackBar.open(
        'Looks like you did not choose a valid interval. Please try again!',
        '',
        {
          duration: 2000
        }
      );
    }
    if (eventFormValidation && !this.hasConflicts(formValue)) {
      this.save(formValue);
      this.saveSuccess$
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
            'Looks like were problems with event save. Please try again!',
            '',
            {
              duration: 2000
            }
          );
        });
    }
  }

  @dispatch()
  save(eventData: any) {
    return this.eventActions.eventSaveStart(eventData);
  }
}

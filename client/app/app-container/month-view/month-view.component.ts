import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import * as _ from 'lodash';
import { EventViewMonthComponent } from './event-view-month/event-view-month.component';

export interface CalendarDate {
  mDate: moment.Moment;
  events?: any;
  today?: boolean;
}

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit, OnChanges {
  @Input() events: any;
  public currentDate = moment();
  public dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public weeks: CalendarDate[] = [];
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.generateCalendar();
  }

  ngOnChanges(changes) {
    if (changes.events && changes.events.currentValue) {
      this.generateCalendar();
    }
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isAfterToday(date: moment.Moment): boolean {
    return moment(date).isAfter(moment(), 'day');
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  private getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateCalendar(): void {
    let dates = this.fillDates(this.currentDate);
    dates = dates.map((element: CalendarDate) => {
      const formattedDate = element.mDate.format('YYYY-MM-DD');
      const dateEvents = [];
      this.events.order.forEach((elem) => {
        if ((this.events.byId[elem].start_date === formattedDate || this.events.byId[elem].finish_date === formattedDate)
            && !this.events.byId[elem].deleted) {
          dateEvents.push({event: this.events.byId[elem], colorLabel: this.getRandomIntInclusive(0, 2)});
        }
      });
      element.events = dateEvents;
      return element;
    });
    this.weeks = dates;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          events: null,
          mDate: d,
        };
      });
  }

  viewEvents(hasEvent: boolean, events: any, date: moment.Moment) {
    if (!hasEvent) {
      return;
    }
    const payloadEvents = events.map((event) => event.event);
    const dialogRef = this.dialog.open(EventViewMonthComponent, {
      height: '550px',
      width: '550px',
      data: { date: date, events: payloadEvents },
      autoFocus: false,
      disableClose: true
    });
  }
}

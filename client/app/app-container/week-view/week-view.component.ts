import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import * as _ from 'lodash';
import { TeamEvent } from '../../store/event/event.data';
import { EventViewComponent } from './event-view/event-view.component';
import { EventManipulationComponent } from '../event-manipulation/event-manipulation.component';

export interface CalendarDate {
  startMoment: moment.Moment;
  endMoment: moment.Moment;
  teamEvent: TeamEvent;
  hasEvent?: boolean;
  today?: boolean;
}

export interface HourStructure {
  label: string;
  calendarDate: CalendarDate[];
}

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss']
})
export class WeekViewComponent implements OnInit, OnChanges {
  @Input() events: any;
  public hours: HourStructure[] = [];
  public days: any[] = [];
  public dayNames = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public currentDate = moment();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.generateWeek();
  }

  ngOnChanges(changes) {
    if (changes.events && changes.events.currentValue) {
      this.generateWeek();
    }
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isAfterToday(date: moment.Moment): boolean {
    return moment(date).isAfter(moment(), 'day');
  }

  prevWeek() {
    this.currentDate = moment(this.currentDate).subtract(1, 'weeks');
    this.generateWeek();
  }

  nextWeek() {
    this.currentDate = moment(this.currentDate).add(1, 'weeks');
    this.generateWeek();
  }

  private isEventInHourQuarter(startHourQuarter: moment.Moment, endHourQuarter: moment.Moment,
                               eventStart: moment.Moment, eventEnd: moment.Moment) {
    return (eventStart.isBetween(startHourQuarter, endHourQuarter, null, '[]'))
      || (eventEnd.isBetween(startHourQuarter, endHourQuarter, null, '[]'));
  }

  private isHourQuarterInEvent(startHourQuarter: moment.Moment, endHourQuarter: moment.Moment,
                               eventStart: moment.Moment, eventEnd: moment.Moment) {
    return (startHourQuarter.isBetween(eventStart, eventEnd, null, '[]'))
      || (endHourQuarter.isBetween(eventStart, eventEnd, null, '[]'));
  }

  generateWeek() {
    const weekDates = this.fillDates(this.currentDate);

    this.days = weekDates.map((item: CalendarDate, index: number) => {
      return {
        dayDate: item.startMoment,
        label: `${this.dayNames[index + 1]}, ${item.startMoment.format('DD MMM')}`,
        today: item.today
      };
    });

    this.days.unshift({dayDate: null, label: '', today: false});

    _.range(0, 24)
      .map((item: number) => {
        this.hours[8 * item] = {
          label: this.formatHour(item),
          calendarDate: []
        };
      });
    weekDates.forEach((item: CalendarDate, index: number) => {
      _.range(0, 24)
        .map((increment: number) => {
          const calendarDateSeed: CalendarDate = {
            startMoment: null,
            endMoment: null,
            teamEvent: null,
            hasEvent: null,
            today: null
          };
          calendarDateSeed.today = item.today;
          calendarDateSeed.hasEvent = item.hasEvent;
          calendarDateSeed.teamEvent = JSON.parse(JSON.stringify(item.teamEvent));
          calendarDateSeed.startMoment = item.startMoment.clone();
          calendarDateSeed.endMoment = item.endMoment.clone();
          calendarDateSeed.startMoment.hours(increment);
          calendarDateSeed.endMoment.hours(increment);
          const hourConfiguration: CalendarDate[] = [];
          for (let i = 0; i <= 3; i++) {
            const hourDate: CalendarDate = {
              startMoment: null,
              endMoment: null,
              teamEvent: null,
              hasEvent: null,
              today: null
            };
            hourDate.today = calendarDateSeed.today;
            hourDate.hasEvent = calendarDateSeed.hasEvent;
            hourDate.startMoment = calendarDateSeed.startMoment.clone();
            hourDate.teamEvent = JSON.parse(JSON.stringify(calendarDateSeed.teamEvent));
            hourDate.endMoment = calendarDateSeed.endMoment.clone();
            hourDate.startMoment.add(i * 15, 'minutes');
            hourDate.endMoment.add((i * 15) + 14, 'minutes');
            hourDate.endMoment.add(59, 'seconds');
            for (let j = 0; j < this.events.order.length; j++) {
              const eventStart = moment(this.events.byId[this.events.order[j]].start_date +
                ' ' + this.events.byId[this.events.order[j]].start_time, 'YYYY-MM-DD hh:mm:ss');
              const eventEnd = moment(this.events.byId[this.events.order[j]].finish_date +
                ' ' + this.events.byId[this.events.order[j]].finish_time, 'YYYY-MM-DD hh:mm:ss');
              hourDate.hasEvent = this.isEventInHourQuarter(hourDate.startMoment, hourDate.endMoment, eventStart, eventEnd)
                || this.isHourQuarterInEvent(hourDate.startMoment, hourDate.endMoment, eventStart, eventEnd);
              if (hourDate.hasEvent) {
                hourDate.teamEvent = JSON.parse(JSON.stringify(this.events.byId[this.events.order[j]]));
                break;
              }
            }
            hourConfiguration.push(hourDate);
          }
          this.hours[8 * increment + (index + 1)] = {
            label: '',
            calendarDate: hourConfiguration
          };
        });
    });
  }

  formatHour(value: number) {
    if (value < 10) {
      return `0${value}:00`;
    } else {
      return `${value}:00`;
    }
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstDayOfGrid = moment(currentMoment).startOf('week');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 7)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          hasEvent: false,
          teamEvent: null,
          startMoment: d,
          endMoment: d
        };
      });
  }

  viewEvent(hasEvent: boolean, event: TeamEvent, date: moment.Moment) {
    if (!hasEvent) {
      return;
    }
    const dialogRef = this.dialog.open(EventViewComponent, {
      height: '550px',
      width: '550px',
      data: { date: date, event: event },
      autoFocus: false,
      disableClose: true
    });
  }

  addEvent(date: moment.Moment) {
    const dialogRef = this.dialog.open(EventManipulationComponent, {
      height: '550px',
      width: '550px',
      data: { date: date, event: null },
      autoFocus: false,
      disableClose: true
    });
  }
}

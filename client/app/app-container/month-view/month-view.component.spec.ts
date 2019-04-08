import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthViewComponent } from './month-view.component';
import { MatDialogModule, MatGridListModule, MatIconModule, MatTooltipModule } from '@angular/material';
import * as moment from 'moment';
import { expectedMonthDate, expectedMonthDatesWithEvents } from './month-view.component.test-data';


describe('MonthViewComponent', () => {
  let component: MonthViewComponent;
  let fixture: ComponentFixture<MonthViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthViewComponent ],
      imports: [
        MatGridListModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthViewComponent);
    component = fixture.componentInstance;
    component.events = {
      order: [],
      byId: {}
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have weeks propety', () => {
    expect(component.weeks).toBeDefined();
  });

  it('should have dayNames propety', () => {
    expect(component.dayNames).toBeDefined();
  });

  it('should have dayNames with values inside', () => {
    expect(component.dayNames).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  });

  it('should have currentDate propety', () => {
    expect(component.currentDate).toBeDefined();
  });

  it('should have a way to verify if a date is today', () => {
    expect(component.isToday(moment())).toBeTruthy();
  });

  it('should have a way to verify if a date is after today', () => {
    const dateToVerify = moment().add(1, 'd');
    expect(component.isAfterToday(dateToVerify)).toBeTruthy();
  });

  it('should have a way to verify if a date is same month', () => {
    component.currentDate = moment('2019-01-04T00:00:00');
    expect(component.isSelectedMonth(moment('2019-01-04T00:00:00'))).toBeTruthy();
  });

  it('should generate month dates', () => {
    const dates = component.fillDates(moment('2019-01-04T00:00:00'));
    const mappedData = dates.map(date => {
      const newDate: any = Object.assign({}, date, {
        mDate: date.mDate.format()
      });
      return newDate;
    });
    const mappedExpectedData = expectedMonthDate().map(date => {
      const newDate: any = Object.assign({}, date, {
        mDate: date.mDate.format()
      });
      return newDate;
    });
    expect(mappedData).toEqual(mappedExpectedData);
  });

  it('should generate month dates with events', () => {
    component.events = {
      order: ['1', '108'],
      byId: {
        '1': {
          attendants: {
            attendants: [
              {id: -1, name: 'admin'}
            ]
          },
          creator: 'admin',
          deleted: false,
          description: 'Test1',
          finish_date: '2019-01-07',
          finish_time: '15:30:00',
          id: 1,
          start_date: '2019-01-07',
          start_time: '15:00:00'
        },
        '108': {
          attendants: {
            attendants: [
              {id: 40, name: 'TestUser1'},
              {id: -1, name: 'admin'}
            ]
          },
          creator: 'admin',
          deleted: false,
          description: 'Test2',
          finish_date: '2019-01-10',
          finish_time: '12:31:21',
          id: 108,
          start_date: '2019-01-10',
          start_time: '12:21:21'
        }
      }
    };
    fixture.detectChanges();
    component.currentDate = moment('2019-01-04T00:00:00');
    fixture.detectChanges();
    component.generateCalendar();
    const mappedData = component.weeks.map(date => {
      const newDate: any = Object.assign({}, date, {
        mDate: date.mDate.format()
      });
      newDate.events = newDate.events.map(ev => {
        delete ev.colorLabel;
        return ev;
      });
      return newDate;
    });
    const mappedExpectedData = expectedMonthDatesWithEvents().map(date => {
      const newDate: any = Object.assign({}, date, {
        mDate: date.mDate.format()
      });
      return newDate;
    });
    expect(mappedData).toEqual(mappedExpectedData);
  });
});

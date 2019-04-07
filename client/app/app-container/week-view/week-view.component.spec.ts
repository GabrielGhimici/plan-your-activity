import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekViewComponent } from './week-view.component';
import { MatDialogModule, MatGridListModule, MatIconModule } from '@angular/material';
import * as moment from 'moment';
import { expectedWeekDate } from './week-view.component.test-data';

describe('WeekViewComponent', () => {
  let component: WeekViewComponent;
  let fixture: ComponentFixture<WeekViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekViewComponent ],
      imports: [
        MatIconModule,
        MatGridListModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekViewComponent);
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

  it('should have hours propety', () => {
    expect(component.hours).toBeDefined();
  });

  it('should have days propety', () => {
    expect(component.days).toBeDefined();
  });

  it('should have dayNames propety', () => {
    expect(component.dayNames).toBeDefined();
  });

  it('should have dayNames with values inside', () => {
    expect(component.dayNames).toEqual(['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
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

/*  it('should generate week dates', () => {
    const dates = component.fillDates(moment('2019-01-04T00:00:00'));
    expect(dates).toEqual(expectedWeekDate());
  });*/

  it('should format hours: one digit', () => {
    const data = component.formatHour(1);
    expect(data).toEqual('01:00');
  });

  it('should format hours: two digits', () => {
    const data = component.formatHour(21);
    expect(data).toEqual('21:00');
  });
});

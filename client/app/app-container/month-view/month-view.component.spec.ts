import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthViewComponent } from './month-view.component';
import { MatDialogModule, MatGridListModule, MatIconModule, MatTooltipModule } from '@angular/material';
import * as moment from 'moment';

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
});

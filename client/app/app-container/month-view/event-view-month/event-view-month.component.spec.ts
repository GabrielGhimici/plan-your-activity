import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewMonthComponent } from './event-view-month.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatExpansionModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let emptyTest = true;
function generateData(empty: boolean) {
  if (empty) {
    return [];
  } else {
    return [
      {
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
    ];
  }
}

describe('EventViewMonthComponent', () => {
  let component: EventViewMonthComponent;
  let fixture: ComponentFixture<EventViewMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventViewMonthComponent ],
      imports: [
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: fixture
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            events: generateData(emptyTest)
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should treat empty list', () => {
    emptyTest = false;
    expect(component.formattedData).toEqual([]);
  });

  it('should treat event data', () => {
    expect(component.formattedData).toEqual([{
      id: 108,
      description: 'Test2',
      dateInterval: '10/01/2019 - 10/01/2019',
      timeInterval: '12:21:21 - 12:31:21',
      attendants: [
        {id: 40, name: 'TestUser1'},
        {id: -1, name: 'admin'}
      ]
    }]);
  });
});

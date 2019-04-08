import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewComponent } from './event-view.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatIconModule, MatListModule } from '@angular/material';

describe('EventViewComponent', () => {
  let component: EventViewComponent;
  let fixture: ComponentFixture<EventViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventViewComponent ],
      imports: [
        MatIconModule,
        MatListModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: fixture
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            event: {
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
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should treat event data', () => {
    expect(component.formattedData).toEqual({
      id: 108,
      description: 'Test2',
      dateInterval: '10/01/2019 - 10/01/2019',
      timeInterval: '12:21:21 - 12:31:21',
      attendants: [
        {id: 40, name: 'TestUser1'},
        {id: -1, name: 'admin'}
      ]
    });
  });
});

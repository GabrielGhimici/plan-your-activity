import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewMonthComponent } from './event-view-month.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatExpansionModule, MatIconModule, MatListModule } from '@angular/material';

describe('EventViewMonthComponent', () => {
  let component: EventViewMonthComponent;
  let fixture: ComponentFixture<EventViewMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventViewMonthComponent ],
      imports: [
        MatExpansionModule,
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
            events: []
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
});

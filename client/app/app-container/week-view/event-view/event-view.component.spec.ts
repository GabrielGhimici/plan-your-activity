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
              attendants: {}
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
});

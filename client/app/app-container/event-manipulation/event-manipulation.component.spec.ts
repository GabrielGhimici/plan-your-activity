import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManipulationComponent } from './event-manipulation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { EventActions } from '../../store/event/event.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EventManipulationComponent', () => {
  let component: EventManipulationComponent;
  let fixture: ComponentFixture<EventManipulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventManipulationComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule
      ],
      providers: [
        EventActions,
        {
          provide: MatDialogRef,
          useValue: fixture
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            event: {}
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

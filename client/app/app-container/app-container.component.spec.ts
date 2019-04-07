import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContainerComponent } from './app-container.component';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatDialogModule, MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { UserDataActions } from '../store/user-data/user-data.actions';
import { LogoutActions } from '../store/logout/logout.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonthViewComponent } from './month-view/month-view.component';
import { WeekViewComponent } from './week-view/week-view.component';
import { EventActions } from '../store/event/event.actions';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppContainerComponent', () => {
  let component: AppContainerComponent;
  let fixture: ComponentFixture<AppContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppContainerComponent ],
      imports: [
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonToggleModule,
        MatGridListModule,
        MatTooltipModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        EventActions,
        UserDataActions,
        LogoutActions
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

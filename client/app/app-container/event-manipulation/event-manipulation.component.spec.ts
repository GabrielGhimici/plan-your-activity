import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManipulationComponent } from './event-manipulation.component';

describe('EventManipulationComponent', () => {
  let component: EventManipulationComponent;
  let fixture: ComponentFixture<EventManipulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventManipulationComponent ]
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

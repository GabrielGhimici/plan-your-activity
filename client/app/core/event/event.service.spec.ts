import { TestBed, inject } from '@angular/core/testing';

import { EventService } from './event.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([EventService], (service: EventService) => {
    expect(service).toBeTruthy();
  }));
});

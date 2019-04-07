import { TestBed, inject } from '@angular/core/testing';

import { ChangePasswordService } from './change-password.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChangePasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChangePasswordService]
    });
  });

  it('should be created', inject([ChangePasswordService], (service: ChangePasswordService) => {
    expect(service).toBeTruthy();
  }));
});

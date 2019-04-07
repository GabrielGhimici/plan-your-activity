import { inject, TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgReduxTestingModule } from '@angular-redux/store/testing';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientTestingModule, NgReduxTestingModule]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChangePasswordService {

  constructor(private http: HttpClient) { }

  public changePassword(bodyValue: string) {
    return this.http.post('api/user/firstLogin', {password: bodyValue});
  }

}

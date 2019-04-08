import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store/app-state';

@Injectable()
export class UserDataService {

  constructor(private http: HttpClient,
              private store: NgRedux<AppState> ) { }

  public getUserData() {
    return this.http.get('api/user/details');
  }

  public createUser(userData: any) {
    return this.http.post('api/user/register', userData);
  }

  get isPermanentAccount() {
    return this.store.select(['userData', 'userProfile', 'permanentAccount']).map((_: boolean) => {
      return _;
    });
  }

  get isLeader() {
    return this.store.select(['userData', 'userProfile', 'team', 'leader']).map((_: boolean) => {
      return _;
    });
  }

  getColleaguesData() {
    return this.http.post('api/user/colleagues',{});
  }
}

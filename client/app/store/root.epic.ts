import { Injectable } from '@angular/core';
import { LoginEpics } from './login/login.epic';
import { UserDataEpics } from './user-data/user-data.epic';
import { LogoutEpic } from './logout/logout.epic';

@Injectable()
export class RootEpics {
  constructor(
    private loginEpics: LoginEpics,
    private userDataEpics: UserDataEpics,
    private logOutEpic: LogoutEpic,
  ) {}

  public createEpics() {
    return [
      this.loginEpics.createEpic(),
      this.userDataEpics.createEpic(),
      this.logOutEpic.createEpic()
    ];
  }
}

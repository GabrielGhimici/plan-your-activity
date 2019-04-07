import { Injectable } from '@angular/core';
import { LoginEpics } from './login/login.epic';
import { UserDataEpics } from './user-data/user-data.epic';
import { LogoutEpic } from './logout/logout.epic';
import { ChangePasswordEpics } from './change-password/change-password.epic';

@Injectable()
export class RootEpics {
  constructor(
    private loginEpics: LoginEpics,
    private userDataEpics: UserDataEpics,
    private logOutEpic: LogoutEpic,
    private changePasswordEpics: ChangePasswordEpics,
  ) {}

  public createEpics() {
    return [
      this.loginEpics.createEpic(),
      this.userDataEpics.createEpic(),
      this.logOutEpic.createEpic(),
      this.changePasswordEpics.createEpic()
    ];
  }
}

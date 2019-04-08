import { Injectable } from '@angular/core';
import { LoginEpics } from './login/login.epic';
import { UserDataEpics } from './user-data/user-data.epic';
import { LogoutEpic } from './logout/logout.epic';
import { ChangePasswordEpics } from './change-password/change-password.epic';
import { AddUserEpic } from './add-user/add-user.epic';
import { EventEpic } from './event/event.epic';

@Injectable()
export class RootEpics {
  constructor(
    private loginEpics: LoginEpics,
    private userDataEpics: UserDataEpics,
    private logOutEpic: LogoutEpic,
    private changePasswordEpics: ChangePasswordEpics,
    private addUserEpic: AddUserEpic,
    private eventEpic: EventEpic,
  ) {}

  public createEpics() {
    return [
      this.loginEpics.createEpic(),
      this.userDataEpics.createEpic(),
      this.logOutEpic.createEpic(),
      this.changePasswordEpics.createEpic(),
      this.addUserEpic.createEpic(),
      this.eventEpic.createEpic()
    ];
  }
}

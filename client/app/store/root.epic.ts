import { Injectable } from '@angular/core';
import { LoginEpics } from './login/login.epic';
import { UserDataEpics } from './user-data/user-data.epic';
import { LogoutEpic } from './logout/logout.epic';
import { ChangePasswordEpics } from './change-password/change-password.epic';
import { AddUserEpic } from './add-user/add-user.epic';
import { EventEpic } from './event/event.epic';
import { ColleaguesEpic } from './colleagues/colleagues.epic';
import { InvitationsEpic } from './invitations/invitations.epic';

@Injectable()
export class RootEpics {
  constructor(
    private loginEpics: LoginEpics,
    private userDataEpics: UserDataEpics,
    private logOutEpic: LogoutEpic,
    private changePasswordEpics: ChangePasswordEpics,
    private addUserEpic: AddUserEpic,
    private eventEpic: EventEpic,
    private colleaguesEpic: ColleaguesEpic,
    private invitationEpic: InvitationsEpic
  ) {}

  public createEpics() {
    return [
      this.loginEpics.createEpic(),
      this.userDataEpics.createEpic(),
      this.logOutEpic.createEpic(),
      this.changePasswordEpics.createEpic(),
      this.addUserEpic.createEpic(),
      this.eventEpic.createEpic(),
      this.colleaguesEpic.createEpic(),
      this.invitationEpic.createEpic()
    ];
  }
}

import { Injectable } from '@angular/core';
import { LoginEpics } from './login/login.epic';

@Injectable()
export class RootEpics {
  constructor(
    private loginEpics: LoginEpics,
  ) {}

  public createEpics() {
    return [
      this.loginEpics.createEpic()
    ];
  }
}

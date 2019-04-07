import { Injectable } from '@angular/core';
import { LoginService } from '../../core/login/login.service';
import { LogoutActions } from './logout.actions';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class LogoutEpic {

  constructor(private loginService: LoginService,
              private logOutActions: LogoutActions) {}

  public createEpic() {
    return createEpicMiddleware(this.loginEpic());
  }

  private loginEpic() {
    return action$ => action$
      .ofType(LogoutActions.LOGOUT_STARTED)
      .switchMap(action => this.loginService.logOut()
        .map(data => this.logOutActions.logoutSucceeded(true))
        .catch(data => Observable.of(this.logOutActions.logoutFailed(data)))
      );
  }
}

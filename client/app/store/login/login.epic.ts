import { Injectable } from '@angular/core';
import { LoginService } from '../../core/login/login.service';
import { LoginActions } from './login.actions';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class LoginEpics {

  constructor(private loginService: LoginService,
              private loginActions: LoginActions) {}

  public createEpic() {
    return createEpicMiddleware(this.loginEpic());
  }

  private loginEpic() {
    return action$ => action$
      .ofType(LoginActions.LOGIN_STARTED)
      .switchMap(action => this.loginService.logIn(action.payload)
        .map(data => this.loginActions.loginSucceeded(data['OK']))
        .catch(data => Observable.of(this.loginActions.loginFailed(data)))
      );
  }
}

import { Injectable } from '@angular/core';
import { ChangePasswordService } from '../../core/change-password/change-password.service';
import { ChangePasswordActions } from './change-password.actions';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChangePasswordEpics {

  constructor(private changeService: ChangePasswordService,
              private changeActions: ChangePasswordActions) {}

  public createEpic() {
    return createEpicMiddleware(this.changePasswordEpic());
  }

  private changePasswordEpic() {
    return action$ => action$
      .ofType(ChangePasswordActions.CHANGE_STARTED)
      .switchMap(action => this.changeService.changePassword(action.payload)
        .map(data => this.changeActions.changeSucceded(true))
        .catch(data => Observable.of(this.changeActions.changeFailed(data)))
      );
  }
}

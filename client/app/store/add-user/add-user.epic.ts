import { Injectable } from '@angular/core';
import { UserDataService } from '../../core/user-data/user-data.service';
import { AddUserActions } from './add-user.actions';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddUserEpic {

  constructor(private userDataService: UserDataService,
              private addUserActions: AddUserActions) {}

  public createEpic() {
    return createEpicMiddleware(this.loginEpic());
  }

  private loginEpic() {
    return action$ => action$
      .ofType(AddUserActions.ADD_STARTED)
      .switchMap(action => this.userDataService.createUser(action.payload)
        .map(data => this.addUserActions.addingSucceded(data['OK']))
        .catch(data => Observable.of(this.addUserActions.addingFailed(data)))
      );
  }
}

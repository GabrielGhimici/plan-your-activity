import { Injectable } from '@angular/core';
import { UserDataService } from '../../core/user-data/user-data.service';
import { UserDataActions } from './user-data.actions';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class UserDataEpics {
  constructor(private userDataService: UserDataService,
              private userActions: UserDataActions) {}

  public createEpic() {
    return createEpicMiddleware(this.userDataLoad());
  }

  private userDataLoad() {
    return action$ => action$
      .ofType(UserDataActions.USER_DATA_LOAD_STARTED)
      .switchMap(action => this.userDataService.getUserData()
        .map(data => this.userActions.userDataLoadingSucceded(data))
        .catch(response => Observable.of(this.userActions.userDataLoadingFailed(response)))
      );
  }
}

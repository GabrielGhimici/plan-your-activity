import { Injectable } from '@angular/core';
import { UserDataService } from '../../core/user-data/user-data.service';
import { ColleaguesActions } from './colleagues.actions';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class ColleaguesEpic {
  constructor(private userDataService: UserDataService,
              private colleaguesActions: ColleaguesActions) {}

  public createEpic() {
    return createEpicMiddleware(this.colleaguesDataLoad());
  }

  private colleaguesDataLoad() {
    return action$ => action$
      .ofType(ColleaguesActions.COLLEAGUES_DATA_LOAD_STARTED)
      .switchMap(action => this.userDataService.getColleaguesData()
        .map(data => this.colleaguesActions.colleaguesDataLoadingSucceded(data['users']))
        .catch(response => Observable.of(this.colleaguesActions.colleaguesDataLoadingFailed(response)))
      );
  }
}

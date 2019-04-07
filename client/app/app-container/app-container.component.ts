import { Component, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { UserDataActions } from '../store/user-data/user-data.actions';
import { LogoutActions } from '../store/logout/logout.actions';
import { EventActions } from '../store/event/event.actions';
import * as moment from 'moment';

export const CALENDAR_VIEW = {
  MONTH: 'month',
  WEEK: 'week'
};

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit {

  @select(['userData', 'loading']) public userDataLoading$: Observable<boolean>;
  @select(['userData', 'userProfile', 'team', 'leader']) public leader$: Observable<boolean>;
  @select(['userData', 'userProfile']) public userProfile$: Observable<any>;
  @select(['logoutData', 'loggedOut']) public userDataLogout$: Observable<boolean>;
  @select(['userData', 'userProfile', 'permanentAccount']) public permanentAccount$: Observable<boolean>;
  @select(['events', 'loading']) public eventsLoading$: Observable<boolean>;
  @select(['events']) public events$: Observable<any>;

  private allEvents: any = [];
  public CALENDAR_VIEW = CALENDAR_VIEW;
  public calView = this.CALENDAR_VIEW.MONTH;

  constructor(
    private userDataActions: UserDataActions,
    private eventDataActions: EventActions,
    private logOutActions: LogoutActions,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUserProfile();
    this.getEvents();
    this.permanentAccount$
      .filter((value: any) => !isNullOrUndefined(value))
      .subscribe((value: boolean) => {
        if (value === false) {
          this.router.navigate(['/firstLogin']);
        }
      });
    this.events$
      .filter((value: any) => !isNullOrUndefined(value))
      .subscribe((values: any) => {
        if (values) {
          values.order.forEach((elem: any) => {
            this.allEvents.push(values.byId[elem]);
          });
        }
      });
  }

  @dispatch()
  getUserProfile() {
    return this.userDataActions.loadUserData();
  }

  @dispatch()
  getEvents() {
    return this.eventDataActions.startLoadingEvents();
  }

  logOutUser() {
    this.logOut();
    this.userDataLogout$
      .filter((value) => !isNullOrUndefined(value))
      .subscribe((value) => {
        if (value) {
          const pairs = document.cookie.replace(/\s/g, '').split(';');
          let cookieString = '';
          for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            if (pair[0] === 'PYAToken') {
              cookieString = cookieString + `${pair[0]} = ${''};`;
            } else {
              cookieString = cookieString + `${pair[0]} = ${pair[1]};`;
            }
          }
          document.cookie = cookieString;
          this.router.navigate(['/login']);
        }
      });
  }

  @dispatch()
  logOut() {
    return this.logOutActions.startLogout();
  }

  public formatDate(input: string) {
    return moment(input, 'YYYY-MM-DD').format('DD/MM/YYYY');
  }
}

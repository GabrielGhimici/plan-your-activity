import { Component, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { UserDataActions } from '../store/user-data/user-data.actions';
import { LogoutActions } from '../store/logout/logout.actions';

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

  constructor(
    private userDataActions: UserDataActions,
    private logOutActions: LogoutActions,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUserProfile();
    this.permanentAccount$
      .filter((value: any) => !isNullOrUndefined(value))
      .subscribe((value: boolean) => {
        if (value === false) {
          this.router.navigate(['/firstLogin']);
        }
      });
  }

  @dispatch()
  getUserProfile() {
    return this.userDataActions.loadUserData();
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

}

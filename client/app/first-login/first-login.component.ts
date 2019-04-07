import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutActions } from '../store/logout/logout.actions';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { dispatch, select } from '@angular-redux/store';
import { isNullOrUndefined } from 'util';
import { ChangePasswordActions } from '../store/change-password/change-password.actions';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {
  @select(['changePasswordData', 'loading']) public changePasswordLoading$: Observable<any>;
  @select(['changePasswordData', 'error']) public changePasswordError$: Observable<any>;
  @select(['changePasswordData', 'loggedIn']) public changedPassword$: Observable<any>;
  @select(['userData', 'userProfile']) public userProfile$: Observable<any>;
  @select(['userData', 'loading']) public userDataLoading$: Observable<boolean>;
  @select(['logoutData', 'loggedOut']) public userDataLogout$: Observable<boolean>;
  constructor(private changeActions: ChangePasswordActions,
              private router: Router,
              private logOutActions: LogoutActions,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
  }

  @dispatch()
  startChange(formValue: any) {
    return this.changeActions.startChange(formValue);
  }

  changePassword(formValue: any, formValidity: boolean) {
    if (formValidity) {
      if (formValue.password === formValue.passwordConfirmation) {
        this.startChange(formValue.password);
      } else {
        this.matSnackBar.open(
          'Looks like were password doesn\'t match!',
          '',
          {
            duration: 1000
          }
        );
      }
      this.changedPassword$
        .filter((data) => !isNullOrUndefined(data))
        .subscribe((data) => {
          if (data === true) {
            this.router.navigate(['/app']);
          }
        });
      this.changePasswordError$
        .filter((data) => !isNullOrUndefined(data))
        .subscribe((data) => {
          this.matSnackBar.open(
            'Looks like were some errors. Try again!',
            '',
            {
              duration: 2000
            }
          );
        });
    }
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

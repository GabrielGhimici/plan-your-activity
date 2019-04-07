import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LogoutActions } from '../store/logout/logout.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { dispatch, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { AddUserActions } from '../store/add-user/add-user.actions';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  @select(['addUserData', 'added']) public addUserAdded$: Observable<any>;
  @select(['addUserData', 'loading']) public addUserLoading$: Observable<any>;
  @select(['addUserData', 'error']) public addUserError$: Observable<any>;
  @select(['userData', 'loading']) public userDataLoading$: Observable<boolean>;
  @select(['userData', 'userProfile']) public userProfile$: Observable<any>;
  @select(['logoutData', 'loggedOut']) public userDataLogout$: Observable<boolean>;
  @ViewChild('addUserForm') private addUserForm: any;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private addUserActions: AddUserActions,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private logOutActions: LogoutActions
  ) { }

  ngOnInit() {
    this.addUserAdded$
      .filter((value: boolean) => !isNullOrUndefined(value))
      .takeUntil(this.ngUnsubscribe)
      .subscribe((value: boolean) => {
        if (value) {
          this.addUserForm.resetForm();
          this.matSnackBar.open(
            'User added with success! You can add another one.',
            '',
            {
              duration: 2000
            }
          );
        }
      });
    this.addUserError$
      .filter((value: any) => !isNullOrUndefined(value))
      .takeUntil(this.ngUnsubscribe)
      .subscribe((value: any) => {
        this.matSnackBar.open(
          'Oops! There were errors, please try again!',
          '',
          {
            duration: 2000
          }
        );
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.resetState();
  }

  @dispatch()
  resetState() {
    return this.addUserActions.resetState();
  }

  @dispatch()
  startAdding(userData: any) {
    userData['team'] = null;
    return this.addUserActions.startAdding(userData);
  }

  addUser(formValue: any, formValidity: boolean) {
    if (formValidity) {
      this.startAdding(formValue);
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

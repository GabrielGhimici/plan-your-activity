import { Component, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { LoginActions } from '../store/login/login.actions';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @select(['loginData', 'loading']) public loginLoading$: Observable<any>;
  @select(['loginData', 'error']) public loginError$: Observable<any>;
  @select(['loginData', 'loggedIn']) public loggedIn$: Observable<any>;
  constructor(private loginActions: LoginActions,
              private matSnackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  @dispatch()
  startLogin(formValue: any) {
    return this.loginActions.startLogin(formValue);
  }

  doLogin(formValue: any, formValidity: boolean) {
    if (formValidity) {
      const payloadValue = btoa(JSON.stringify(formValue));
      this.startLogin(payloadValue);
      this.loggedIn$
        .filter((data) => !isNullOrUndefined(data))
        .subscribe((data) => {
          if (data === true) {
            this.router.navigate(['/app']);
          }
        });
      this.loginError$
        .filter((data) => !isNullOrUndefined(data))
        .subscribe(() => {
          this.matSnackBar.open(
            'Incorrect email or password',
            '',
            {
              duration: 2000
            }
          );
        });
    }
  }
}

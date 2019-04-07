import { Component } from '@angular/core';
import { LoginActions } from './store/login/login.actions';
import { dispatch } from '@angular-redux/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private loginActions: LoginActions) {
    if (this.getCookies()['PYAToken']) {
      this.fakeLogin();
    }
  }

  @dispatch()
  fakeLogin() {
    return this.loginActions.loginSucceeded(true);
  }

  private getCookies() {
    const pairs = document.cookie.split(';');
    const cookies = {};
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
      cookies[pair[0]] = pair[1];
    }
    return cookies;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../core/login/login.service';
import { isUndefined } from 'util';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService,
              private router: Router) {
  }

  private getCookies() {
    const pairs = document.cookie.replace(/\s/g, '').split(';');
    const cookies = {};
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
      cookies[pair[0]] = pair[1];
    }
    return cookies;
  }

  canActivate() {
    return this.loginService.isLoggedIn
      .filter(value => !isUndefined(value))
      .map(value => {
        const cookies = this.getCookies();
        if (!value || !cookies['PYAToken']) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      });
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserDataService } from '../core/user-data/user-data.service';
import { isNullOrUndefined } from 'util';

@Injectable()
export class FirstLoginGuard implements CanActivate {
  constructor(private userDataService: UserDataService,
              private router: Router) {
  }

  canActivate() {
    return this.userDataService.isPermanentAccount
      .map(value => {
        if (isNullOrUndefined(value)) {
          this.router.navigate(['/app']);
          return false;
        }
        return !value;
      });
  }
}

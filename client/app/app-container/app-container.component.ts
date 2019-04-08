import { Component, OnInit } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { UserDataActions } from '../store/user-data/user-data.actions';
import { LogoutActions } from '../store/logout/logout.actions';
import { EventActions } from '../store/event/event.actions';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import { ColleaguesActions } from '../store/colleagues/colleagues.actions';
import { InvitationsActions } from '../store/invitations/invitations.actions';

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
  @select(['logoutData', 'loggedOut']) public userDataLogout$: Observable<boolean>;
  @select(['events', 'loading']) public eventsLoading$: Observable<boolean>;
  @select(['invitations', 'loading']) public invitationsLoading$: Observable<boolean>;
  @select(['invitations', 'order']) public invitationsOrder$: Observable<any>;
  @select(['invitations', 'byId']) public invitationsById$: Observable<any>;
  @select(['events']) public events$: Observable<any>;
  @select(['userData', 'userProfile', 'permanentAccount']) public permanentAccount$: Observable<boolean>;
  @select(['userData', 'userProfile', 'team', 'leader']) public leader$: Observable<boolean>;
  @select(['userData', 'userProfile']) public userProfile$: Observable<any>;
  @select(['colleagues', 'loading']) public colleaguesLoading$: Observable<boolean>;
  public notificationsFirstView = true;
  public CALENDAR_VIEW = CALENDAR_VIEW;
  public calView = this.CALENDAR_VIEW.MONTH;
  public invitationsById: any;
  private allEvents: any = [];
  constructor(private userDataActions: UserDataActions,
              private eventDataActions: EventActions,
              private colleaguesActions: ColleaguesActions,
              private logOutActions: LogoutActions,
              private invitationsActions: InvitationsActions,
              private router: Router,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUserProfile();
    this.getInvitations();
    this.getEvents();
    this.getColleagues();
    this.permanentAccount$
      .filter((value: any) => !isNullOrUndefined(value))
      .subscribe((value: boolean) => {
        if (value === false) {
          this.router.navigate(['/firstLogin']);
        }
      });
    this.invitationsById$
      .filter((value: any) => !isNullOrUndefined(value))
      .subscribe((values: any) => {
        if (values) {
          this.invitationsById = values;
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

  @dispatch()
  getInvitations() {
    return this.invitationsActions.startLoadingInvitations();
  }

  @dispatch()
  getColleagues() {
    return this.colleaguesActions.loadColleaguesData();
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

  acceptInvitation(invitationData: any) {
    if (this.hasConflicts(this.invitationsById[invitationData].event)) {
      this.matSnackBar.open(
        'Looks like you already have some events in this interval!',
        '',
        {
          duration: 2000
        }
      );
      return;
    }
    this.accept(this.invitationsById[invitationData]);
  }

  rejectInvitation(invitationData: any) {
    this.reject(this.invitationsById[invitationData]);
  }

  @dispatch()
  accept(invData: any) {
    return this.invitationsActions.invitationResponseStart(invData, 1);
  }

  @dispatch()
  reject(invData: any) {
    return this.invitationsActions.invitationResponseStart(invData, 2);
  }

  conflicts(data1: moment.Moment, data2: moment.Moment, data3: moment.Moment, data4: moment.Moment) {
    return data1.isBetween(data3, data4, null, '[]') ||
      data2.isBetween(data3, data4, null, '[]') ||
      data3.isBetween(data1, data2, null, '[]') ||
      data4.isBetween(data1, data2, null, '[]');
  }

  hasConflicts(event: any) {
    let hasConflicts = false;
    for (let i = 0; i < this.allEvents.length; i++) {
      const currentEventStartDate = moment(`${event.start_date} ${event.start_time}`, 'YYYY-MM-DD hh:mm:ss');
      const currentEventFinishDate = moment(`${event.finish_date} ${event.finish_time}`, 'YYYY-MM-DD hh:mm:ss');
      const tempEventStartDate =
        moment(`${this.allEvents[i].start_date} ${this.allEvents[i].start_time}`, 'YYYY-MM-DD hh:mm:ss');
      const tempEventFinishDate =
        moment(`${this.allEvents[i].finish_date} ${this.allEvents[i].finish_time}`, 'YYYY-MM-DD hh:mm:ss');
      if (this.conflicts(currentEventStartDate, currentEventFinishDate, tempEventStartDate, tempEventFinishDate)
        && event.id !== this.allEvents[i].id && !this.allEvents[i].deleted) {
        hasConflicts = true;
        break;
      }
    }
    return hasConflicts;
  }
}

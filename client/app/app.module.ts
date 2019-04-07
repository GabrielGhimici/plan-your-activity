import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { AppState } from './store/app-state';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { RootEpics } from './store/root.epic';
import { rootReducer } from './store/root.reducer';
import { environment } from '../environments/environment';
import { provideReduxForms } from '@angular-redux/form';
import { createLogger } from 'redux-logger';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule, MatSnackBarModule, MatToolbarModule, MatMenuModule, MatListModule, MatNativeDateModule, MatDatepickerModule
} from '@angular/material';
import { LoginEpics } from './store/login/login.epic';
import { LoginService } from './core/login/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { LoginActions } from './store/login/login.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './core/http-interceptors/http-error.interceptor';
import { XsfrHttpInterceptor } from './core/http-interceptors/http-xsfr.interceptor';
import { AppContainerComponent } from './app-container/app-container.component';
import { LoginGuard } from './login/login.guard';
import { UserDataActions } from './store/user-data/user-data.actions';
import { UserDataEpics } from './store/user-data/user-data.epic';
import { UserDataService } from './core/user-data/user-data.service';
import { LogoutActions } from './store/logout/logout.actions';
import { LogoutEpic } from './store/logout/logout.epic';
import { FirstLoginComponent } from './first-login/first-login.component';
import { ChangePasswordActions } from './store/change-password/change-password.actions';
import { ChangePasswordEpics } from './store/change-password/change-password.epic';
import { ChangePasswordService } from './core/change-password/change-password.service';
import { FirstLoginGuard } from './first-login/first-login.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { AddUserActions } from './store/add-user/add-user.actions';
import { AddUserEpic } from './store/add-user/add-user.epic';
import { AddUserGuard } from './add-user/add-user.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    AppContainerComponent,
    FirstLoginComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgReduxModule,
    NgReduxRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'PYAToken',
      headerName: 'Authorization',
    }),
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XsfrHttpInterceptor,
      multi: true,
    },
    LoginActions,
    LoginEpics,
    LoginGuard,
    LoginService,
    LogoutActions,
    LogoutEpic,
    UserDataActions,
    UserDataEpics,
    UserDataService,
    ChangePasswordActions,
    ChangePasswordEpics,
    FirstLoginGuard,
    ChangePasswordService,
    AddUserActions,
    AddUserEpic,
    AddUserGuard,
    RootEpics
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public store: NgRedux<AppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    rootEpics: RootEpics
  ) {
    store.configureStore(
      rootReducer,
      {},
      environment.production ? [...rootEpics.createEpics()] : [createLogger(), ...rootEpics.createEpics()],
      devTools.isEnabled() ? [devTools.enhancer()] : []
    );
    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }
    provideReduxForms(store);
  }
}

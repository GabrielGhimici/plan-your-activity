import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { LoginGuard } from './login/login.guard';
import { FirstLoginComponent } from './first-login/first-login.component';
import { FirstLoginGuard } from './first-login/first-login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: AppContainerComponent, canActivate: [LoginGuard] },
  { path: 'firstLogin', component: FirstLoginComponent, canActivate: [LoginGuard, FirstLoginGuard]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: !environment.production})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

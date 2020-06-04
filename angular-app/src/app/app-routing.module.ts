import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PrivateAppComponent } from './components/private-app/private-app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ListCovtestComponent } from './components/CovtestCrud/list-covtest/list-covtest.component';
import { AdminDashboardComponent } from './components/Dashboards/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './components/UserCrud/user-profile/user-profile.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';


const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'labApp',
  component: PrivateAppComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'admDashboard',
  component: AdminDashboardComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'covtestList',
  component: ListCovtestComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'myProfile',
  component: MyProfileComponent,
  canActivate: [AuthGuardService]
},
{
  path: '',
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

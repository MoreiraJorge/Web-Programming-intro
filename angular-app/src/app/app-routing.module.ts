import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PrivateAppComponent } from './components/private-app/private-app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ListCovtestComponent } from './components/CovtestCrud/list-covtest/list-covtest.component';
import { AdminDashboardComponent } from './components/Dashboards/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './components/UserCrud/user-profile/user-profile.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ListUserComponent } from './components/UserCrud/list-user/list-user.component';
import { EditUserComponent } from './components/UserCrud/edit-user/edit-user.component';
import { AddUserComponent } from './components/UserCrud/add-user/add-user.component';
import { TechDashboardComponent } from './components/Dashboards/tech-dashboard/tech-dashboard.component';
import { DetailCovtestComponent } from './components/CovtestCrud/detail-covtest/detail-covtest.component';
import { EditCovtestComponent } from './components/CovtestCrud/edit-covtest/edit-covtest.component';


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
  path: 'techDashboard',
  component: TechDashboardComponent,
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
  path: 'usrMng',
  component: ListUserComponent,
  canActivate: [AuthGuardService],
  children: [{
    path: 'addUsr',
    component: AddUserComponent
  }]
},
{
  path: 'profile/:id',
  component: UserProfileComponent,
  canActivate: [AuthGuardService]
}, 
{
  path: 'edit/:id',
  component: EditUserComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'covtestDetail/:id',
  component: DetailCovtestComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'covtestEdit/:id',
  component: EditCovtestComponent,
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

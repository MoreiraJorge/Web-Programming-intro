import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PrivateAppComponent } from './components/private-app/private-app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ListCovtestComponent } from './components/covtest/list-covtest/list-covtest.component';
import { ListTechuserComponent } from './components/TechCrud/list-techuser/list-techuser.component';
import { AddTechuserComponent } from './components/TechCrud/add-techuser/add-techuser.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditTechuserComponent } from './components/TechCrud/edit-techuser/edit-techuser.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


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
  path: 'profile',
  component: ProfileDetailsComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'covtestList',
  component: ListCovtestComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'techMng',
  component: ListTechuserComponent,
  canActivate: [AuthGuardService],
  children:[{
    path: 'addTech',
    component: AddTechuserComponent
  }]
},
{
  path: 'profile/:id',
  component: ProfileComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'edit/:id',
  component: EditTechuserComponent,
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

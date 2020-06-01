import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PrivateAppComponent } from './components/private-app/private-app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ListCovtestComponent } from './components/covtest/list-covtest/list-covtest.component';


const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'labApp',
  component: PrivateAppComponent,
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
  path: '',
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

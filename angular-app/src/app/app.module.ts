import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PrivateAppComponent } from './components/private-app/private-app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { TechDashboardComponent } from './components/tech-dashboard/tech-dashboard.component';
import { ExtDashboardComponent } from './components/ext-dashboard/ext-dashboard.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';

import { PopupPassComponent } from './components/popup-pass/popup-pass.component';
import { ListCovtestComponent } from './components/covtest/list-covtest/list-covtest.component';
import { AddCovtestComponent } from './components/covtest/add-covtest/add-covtest.component';
import { EditCovtestComponent } from './components/covtest/edit-covtest/edit-covtest.component';
import { DetailCovtestComponent } from './components/covtest/detail-covtest/detail-covtest.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrivateAppComponent,
    AdminDashboardComponent,
    TechDashboardComponent,
    ExtDashboardComponent,
    ProfileDetailsComponent,
    PopupPassComponent,
    ListCovtestComponent,
    AddCovtestComponent,
    EditCovtestComponent,
    DetailCovtestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

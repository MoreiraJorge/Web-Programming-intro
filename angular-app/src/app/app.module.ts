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
import { PopupPassComponent } from './components/popup-pass/popup-pass.component';

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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

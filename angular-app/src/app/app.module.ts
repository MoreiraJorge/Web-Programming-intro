import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PrivateAppComponent } from './components/private-app/private-app.component';
import { AdminDashboardComponent } from './components/Dashboards/admin-dashboard/admin-dashboard.component';
import { TechDashboardComponent } from './components/Dashboards/tech-dashboard/tech-dashboard.component';
import { ExtDashboardComponent } from './components/Dashboards/ext-dashboard/ext-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';


import { PopupPassComponent } from './components/popups/popup-pass/popup-pass.component';
import { ListCovtestComponent } from './components/CovtestCrud/list-covtest/list-covtest.component';
import { AddCovtestComponent } from './components/CovtestCrud/add-covtest/add-covtest.component';
import { EditCovtestComponent } from './components/CovtestCrud/edit-covtest/edit-covtest.component';
import { DetailCovtestComponent } from './components/CovtestCrud/detail-covtest/detail-covtest.component';
import { AddUserComponent } from './components/UserCrud/add-user/add-user.component';
import { ListUserComponent } from './components/UserCrud/list-user/list-user.component';
import { EditUserComponent } from './components/UserCrud/edit-user/edit-user.component';
import { UserProfileComponent } from './components/UserCrud/user-profile/user-profile.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PopupUploadComponent } from './components/popups/popup-upload/popup-upload.component';
import { PopupDateComponent } from './components/popups/popup-date/popup-date.component';
import { PopupAddUsrComponent } from './components/popups/popup-add-usr/popup-add-usr.component';
import { PopupDownloadComponent } from './components/popups/popup-download/popup-download.component';
import { PopupUploadFailComponent } from './components/popups/popup-upload-fail/popup-upload-fail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrivateAppComponent,
    AdminDashboardComponent,
    TechDashboardComponent,
    ExtDashboardComponent,
    PopupPassComponent,
    ListCovtestComponent,
    AddCovtestComponent,
    EditCovtestComponent,
    DetailCovtestComponent,
    AddUserComponent,
    ListUserComponent,
    EditUserComponent,
    UserProfileComponent,
    MyProfileComponent,
    PopupUploadComponent,
    PopupDateComponent,
    PopupAddUsrComponent,
    PopupDownloadComponent,
    PopupUploadFailComponent
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
    MatGridListModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatRadioModule
  ],

  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]

})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service'
import { MatDialog } from '@angular/material/dialog';
import { PopupPassComponent } from '../popups/popup-pass/popup-pass.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.sass']
})
export class MyProfileComponent implements OnInit {

  user: User
  password: string

  constructor(public sessionService: SessionService,
    public adminService: AdminService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMe()
  }

  getMe() {
    this.sessionService.me().subscribe((data: User) => {
      this.user = data
      //console.log(this.user);
    });
  }

  changePass() {
    this.adminService.changeAdminPass(this.user.idCard, JSON.parse(`{ "password":"${this.password}"}`)).subscribe((result) => {
      if (this.password) {
        this.openDialog()
      }
    }, (err) => {
      console.log(err);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopupPassComponent);
    console.log(dialogRef)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  Back() {
    if (this.user.role == 'ADM') {
      this.router.navigate(['admDashboard'])
    } else if (this.user.role == 'TECH') {
      this.router.navigate(['techDashboard'])
    } else if (this.user.role == 'EXT') {
      this.router.navigate(['extDashboard'])
    }
  }

}

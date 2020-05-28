import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service'
import {MatDialog} from '@angular/material/dialog';
import { PopupPassComponent } from '../popup-pass/popup-pass.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.sass']
})
export class ProfileDetailsComponent implements OnInit {

  user: User
  password: string

  constructor(public sessionService: SessionService, public adminService: AdminService, private route: ActivatedRoute, 
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMe()
  }

  getMe() {
    this.sessionService.me().subscribe((data: User) => {
      this.user = data
      console.log(this.user);
    });
  }

  changePass() {
    this.adminService.changeAdminPass(this.user.idCard, JSON.parse(`{ "password":"${ this.password }"}`)).subscribe((result) => {
      this.router.navigate(['/profile']);
      this.openDialog()
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

}
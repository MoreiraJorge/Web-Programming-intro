import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.sass']
})
export class ProfileDetailsComponent implements OnInit {

  user:User

  constructor(public sessionService: SessionService) { }

  ngOnInit(): void {
    this.getMe()
  }

  getMe() {
    this.sessionService.me().subscribe((data: User) => {
      this.user = data
      console.log(this.user);
    });
  }

}

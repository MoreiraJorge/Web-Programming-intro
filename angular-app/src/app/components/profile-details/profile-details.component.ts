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

  constructor(public sessionService: SessionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getMe()
  }

  getMe() {
    this.sessionService.me().subscribe((data) => {
      console.log(data);
      this.user = data
    });
  }

}

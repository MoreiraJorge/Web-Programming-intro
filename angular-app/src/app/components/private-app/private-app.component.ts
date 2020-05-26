import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-private-app',
  templateUrl: './private-app.component.html',
  styleUrls: ['./private-app.component.sass']
})
export class PrivateAppComponent implements OnInit {

  user: User

  constructor(public sessionService: SessionService, public router: Router) { }

  ngOnInit(): void {
    this.sessionService.me().subscribe((user: User) => {
      this.user = user;
      if (!this.user) {
        const options = this.sessionService.expired ? { queryParams: { expired: 'true' } } : undefined
        this.router.navigate(['/login'], options);
      }
    })
  }


}

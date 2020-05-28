import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent implements OnInit {

  @Input()
  user:User

  errors: String

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  seeProfile(){
    this.router.navigate(['/profile']);
  }

  logout(event): void {
    event.preventDefault()
    this.errors = ''
    this.sessionService.logout()
      .subscribe(
        () => {
          this.router.navigate(['/labApp'])
        },
        (error) => {
          if (error.status === 401) {
            this.errors = 'Invalid credentials.'
          } else {
            this.errors = error.message
          }
        })

  }

}

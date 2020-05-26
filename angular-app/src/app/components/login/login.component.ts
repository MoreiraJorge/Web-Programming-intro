import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  email: String
  password: String

  errors: String

  user: User

  constructor(public sessionService: SessionService, public router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        if (params.expired) {
          this.errors = 'Your session was expired'
        }
      })
  }

  handleSubmit(event): void {
    event.preventDefault()
    this.errors = ''
    this.sessionService.login(this.email, this.password)
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

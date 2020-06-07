import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-tech-dashboard',
  templateUrl: './tech-dashboard.component.html',
  styleUrls: ['./tech-dashboard.component.sass']
})
export class TechDashboardComponent implements OnInit {

  @Input()
  user: User

  errors: String

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  seeProfile() {
    this.router.navigate(['/myProfile']);
  }

  ExtManagement(){
    this.router.navigate(['/usrMng']);
  }

  logout(){
    event.preventDefault()
    this.errors = ''
    this.sessionService.logout()
    this.router.navigate(['/login'])
  }

}

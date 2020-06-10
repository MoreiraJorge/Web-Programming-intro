import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Covtest } from 'src/app/models/covtest';
import { ExtUserService } from 'src/app/services/ext-user.service';
import { CovtestsService } from 'src/app/services/covtests.service';
import { windowTime } from 'rxjs/operators';

@Component({
  selector: 'app-ext-dashboard',
  templateUrl: './ext-dashboard.component.html',
  styleUrls: ['./ext-dashboard.component.sass']
})
export class ExtDashboardComponent implements OnInit {

  @Input()
  user: User

  id: string
  errors: string

  covtests: Covtest[]

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService, private CovtestService: CovtestsService) { }

  ngOnInit(): void {
    this.getMe()
    this.getUserTests()
  }

  getMe() {
    this.sessionService.me().subscribe((data: User) => {
      if (data) {
        this.id = data.idCard;
        //console.log(this.id)
      }
    });
  }

  getUserTests(): void {
    this.CovtestService.getUserTests(this.id).subscribe((covtests) => {
      this.covtests = covtests;
    }, (err) => { console.log(err) })
  }

  seeProfile() {
    this.router.navigate(['/myProfile']);
  }

  add() {
    this.router.navigate([`/addTest`]);
  }

  TestDetails(id: string) {
    this.router.navigate([`/covtestDetail/${id}`])
  }

  logout() {
    event.preventDefault()
    this.errors = ''
    this.sessionService.logout()
    this.router.navigate(['/login'])
  }

}

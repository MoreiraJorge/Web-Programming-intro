import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CovtestsService } from 'src/app/services/covtests.service';
import { Covtest } from 'src/app/models/covtest';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-add-covtest',
  templateUrl: './add-covtest.component.html',
  styleUrls: ['./add-covtest.component.sass']
})
export class AddCovtestComponent implements OnInit {

  user: User

  description: string
  userHistory: string
  riskGroup: string
  riskJob: string
  saude24: boolean

  @Input() testData: Covtest = new Covtest(this.description, this.userHistory, this.riskGroup, this.riskJob, this.saude24);

  constructor(private router: Router, private CovtestService: CovtestsService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.getMe()
  }

  getMe() {
    this.sessionService.me().subscribe((data: User) => {
      this.user = data
    });
  }

  createTest() {
    this.CovtestService.createTest(this.testData, this.user._id).subscribe((result) => {
      this.router.navigate(['/extDashboard'])
    })
  }

}

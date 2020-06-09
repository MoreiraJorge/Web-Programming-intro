import { Component, OnInit } from '@angular/core';
import { Covtest } from 'src/app/models/covtest';
import { ActivatedRoute, Router } from '@angular/router';
import { CovtestsService } from 'src/app/services/covtests.service';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-detail-covtest',
  templateUrl: './detail-covtest.component.html',
  styleUrls: ['./detail-covtest.component.sass']
})
export class DetailCovtestComponent implements OnInit {

  covtest: Covtest
  user: User
  role: string

  constructor(private route: ActivatedRoute, private router: Router, private CovtestService: CovtestsService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.getCovTest()
    this.getMe()
  }

  getMe() {
    this.sessionService.me().subscribe((data: User) => {
      if (data === null) {
        this.role = ''
      } else {
        this.role = data.role
      }
    });
  }

  getCovTest() {
    this.CovtestService.getTestByID(this.route.snapshot.params['id']).subscribe((covtest: Covtest) => {
      this.covtest = covtest;
    });
  }

  Back() {
    if (this.role == 'TECH') {
      this.router.navigate(['/techDashboard'])
    } else if (this.role == 'EXT') {
      this.router.navigate(['/extDashboard'])
    }
  }

  edit(id: string) {
    this.router.navigate([`/covtestEdit/${id}`])
  }

  download(id: string) {
    this.CovtestService.downloadFile(id).subscribe((data) => {
      window.open(data.url, '_blank');
    })
  }

}

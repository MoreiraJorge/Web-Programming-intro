import { Component, OnInit } from '@angular/core';
import { Covtest } from 'src/app/models/covtest';
import { ActivatedRoute, Router } from '@angular/router';
import { CovtestsService } from 'src/app/services/covtests.service';

@Component({
  selector: 'app-detail-covtest',
  templateUrl: './detail-covtest.component.html',
  styleUrls: ['./detail-covtest.component.sass']
})
export class DetailCovtestComponent implements OnInit {

  covtest: Covtest

  constructor(private route: ActivatedRoute, private router: Router, private CovtestService: CovtestsService) { }

  ngOnInit(): void {
    this.getCovTest()
  }

  getCovTest() {
    this.CovtestService.getTestByID(this.route.snapshot.params['id']).subscribe((covtest: Covtest) => {
      this.covtest = covtest;
    });
  }


}

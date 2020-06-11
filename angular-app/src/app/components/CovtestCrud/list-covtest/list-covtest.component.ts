import { Component, OnInit } from '@angular/core';
import { Covtest } from 'src/app/models/covtest';
import { ActivatedRoute, Router } from '@angular/router';
import { CovtestsService } from 'src/app/services/covtests.service';

@Component({
  selector: 'app-list-covtest',
  templateUrl: './list-covtest.component.html',
  styleUrls: ['./list-covtest.component.sass']
})
export class ListCovtestComponent implements OnInit {

  covtests: Covtest[];

  userid: string;
  testId: string;

  displayedColumns: string[] = ['ID', 'Detalhes', 'Data', 'Resultado'];

  constructor(private route: ActivatedRoute, private router: Router, private CovtestService: CovtestsService) { }

  ngOnInit(): void {
    this.getTotalTests()
  }

  getTotalTests() {
    this.CovtestService.getTests().subscribe((covtests) => {
      this.covtests = covtests;
      console.log(JSON.stringify(covtests))
    }, (err) => { console.log(err) })
  }

  getUserTests(): void {
    if (this.userid) {
      this.CovtestService.getUserTests(this.userid).subscribe((covtests) => {
        this.covtests = covtests;
        console.log(JSON.stringify(covtests))
      }, (err) => { console.log(err) })
    } else {
      this.ngOnInit()
    }

  }

  getPositiveTests(): void {
    this.CovtestService.listPositive().subscribe((covtests) => {
      this.covtests = covtests;
      console.log(JSON.stringify(covtests))
    }, (err) => { console.log(err) })
  }

  getNegativeTests(): void {
    this.CovtestService.listNegative().subscribe((covtests) => {
      this.covtests = covtests;
      console.log(JSON.stringify(covtests))
    }, (err) => { console.log(err) })
  }

  getPendingTests(): void {
    this.CovtestService.listPending().subscribe((covtests) => {
      this.covtests = covtests;
      console.log(JSON.stringify(covtests))
    }, (err) => { console.log(err) })
  }

  TestDetails(id: string) {
    this.router.navigate([`/covtestDetail/${id}`])
  }

  getByID() {
    this.CovtestService.getTestByID(this.testId).subscribe((covtests) => {
      let array = [covtests]
      this.covtests = array;
      console.log(JSON.stringify(covtests))
    }, (err) => { console.log(err) })
  }

}

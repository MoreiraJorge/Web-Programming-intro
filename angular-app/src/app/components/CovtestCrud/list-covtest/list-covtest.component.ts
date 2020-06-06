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
  //selectedTest: Covtest;
  userid: string;

  constructor(private route: ActivatedRoute, private router: Router, private CovtestService: CovtestsService) { }

  ngOnInit(): void {
    this.CovtestService.getTests().subscribe((covtests) => {
      this.covtests = covtests;
      console.log(JSON.stringify(covtests))
    }, (err) => { console.log(err) })
  }

  getUserTests():void{
    if(this.userid){
      this.CovtestService.getUserTests(this.userid).subscribe((covtests) => {
        this.covtests = covtests;
        console.log(JSON.stringify(covtests))
      }, (err) => { console.log(err) })
    } else {
      this.ngOnInit()
    }

  }

  TestDetails( Testcode: string ){
    this.router.navigate([`/covtestDetail/${ Testcode }`])
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Covtest } from 'src/app/models/covtest';
import { ActivatedRoute, Router } from '@angular/router';
import { CovtestsService } from 'src/app/services/covtests.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-covtest',
  templateUrl: './edit-covtest.component.html',
  styleUrls: ['./edit-covtest.component.sass']
})
export class EditCovtestComponent implements OnInit {

  covtest: Covtest

  @Input() userStatus: string
  @Input() testResult: string
  @Input() schedule: Date
  fileToUpload: File;

  constructor(private route: ActivatedRoute, private router: Router, private CovtestService: CovtestsService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.CovtestService.getTestByID(this.route.snapshot.params['id']).subscribe((covtest: Covtest) => {
      this.covtest = covtest;
    });
  }

  updateUsrStatus(id: string) {
    let params = `{ "userStatus": "${this.userStatus}"}`;
    this.CovtestService.updateUserTestStatus(params, id).subscribe((result: Covtest) => {
      //console.log(result)
    })
    this.router.navigate([`/covtestDetail/${id}`])
  }

  updateResult(id: string) {
    let params = `{ "testResult": "${this.testResult}"}`;
    this.CovtestService.updateTestResult(params, id).subscribe((result: Covtest) => {
      //console.log(result)
    })
    this.router.navigate([`/covtestDetail/${id}`])
  }

  scheduleTest(id: string) {
    let params = `{ "schedule": "${this.schedule}"}`;
    this.CovtestService.scheduleTest(params, id).subscribe((result: Covtest) => {
      //console.log(result)
    })
    this.router.navigate([`/covtestDetail/${id}`])
  }

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0)
    console.log('file selected');
  }
  /*
  upload(id: string){
    this.CovtestService.uploadFile(formData, id).subscribe((result) =>{
      console.log(result)
    })
  }
*/

  onSubmit(e: Event, id:string){
    e.preventDefault();
    this.CovtestService.uploadFile(this.fileToUpload, id).subscribe((result) => {
      console.log(result)
    })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Covtest } from 'src/app/models/covtest';
import { ActivatedRoute, Router } from '@angular/router';
import { CovtestsService } from 'src/app/services/covtests.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupUploadComponent } from '../../popups/popup-upload/popup-upload.component';
import { PopupUploadFailComponent } from '../../popups/popup-upload-fail/popup-upload-fail.component';

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

  constructor(private route: ActivatedRoute, private router: Router, private CovtestService: CovtestsService, public dialog: MatDialog) { }

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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0)
  }

  onSubmit(e: Event, id: string) {
    e.preventDefault();
    try {
      this.CovtestService.uploadFile(this.fileToUpload, id).subscribe((result) => {
        console.log(result)
      })
      this.openDialog()
    } catch (e) {
      this.openSecondDialog()
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopupUploadComponent);
    console.log(dialogRef)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSecondDialog() {
    const dialogRef = this.dialog.open(PopupUploadFailComponent);
    console.log(dialogRef)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  Back(id: string) {
    this.router.navigate([`/covtestDetail/${id}`])
  }

}

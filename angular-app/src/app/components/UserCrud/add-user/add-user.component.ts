import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { TechUserService } from 'src/app/services/tech-user.service';
import { SessionService } from 'src/app/services/session.service';
import { ExtUserService } from 'src/app/services/ext-user.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PopupDateComponent } from '../../popups/popup-date/popup-date.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupAddUsrComponent } from '../../popups/popup-add-usr/popup-add-usr.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  name: string;
  address: string;
  age: number;
  email: string;
  password: string;
  phoneNumber: number;
  idCard: string;

  role: string

  @Input() userData: User = new User(this.name, this.address, this.age, this.email, this.password, this.phoneNumber);

  constructor(private router: Router,
    private TechUserService: TechUserService,
    public sessionService: SessionService,
    private ExtUserService: ExtUserService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
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

  addUser() {
    if (this.role == 'ADM') {
      this.TechUserService.addTech(this.userData).subscribe((result: User) => {
        this.router.navigate(['/usrMng'])
      }, (err) => {
        this.openDialog()
        console.log(err);
      });

    } else if (this.role == 'TECH') {
      this.ExtUserService.addExt(this.userData).subscribe((result: User) => {
        this.router.navigate(['/usrMng'])
      },(err) => {
        this.openDialog()
        console.log(err);
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopupAddUsrComponent);
    console.log(dialogRef)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  Back() {
    this.router.navigate(['/usrMng'])
  }

}

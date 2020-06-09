import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechUserService } from 'src/app/services/tech-user.service';
import { SessionService } from 'src/app/services/session.service';
import { ExtUserService } from 'src/app/services/ext-user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {

  role: string

  @Input() userData: any = { name: '', address: '', age: 0, email: '', password: '', phoneNumber: 0, idCard: '' };
  @Input() ExtUserData: any = { name: '', address: '', age: 0, email: '', password: '', phoneNumber: 0, idCard: '', infected: '' };

  constructor(private route: ActivatedRoute, private router: Router,
    private TechUserService: TechUserService,
    public sessionService: SessionService,
    private ExtUserService: ExtUserService) { }

  ngOnInit(): void {
    this.getMe()
    this.getData()
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

  getData() {
    if (this.role == 'ADM') {
      this.TechUserService.getTechByID(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.userData = data;
      });
    } else if (this.role == 'TECH') {
      this.ExtUserService.getExtByID(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.ExtUserData = data;
      });
    }
  }

  update() {
    var idTemp = this.route.snapshot.params['id'];

    if (this.role == 'ADM') {

      this.TechUserService.updateTech(idTemp, this.userData).subscribe((result) => {
        this.router.navigate(['/profile/' + this.userData.idCard]);
      }, (err) => {
        console.log(err);
      });

    } else if (this.role == 'TECH') {
      this.ExtUserService.updateExt(idTemp, this.ExtUserData).subscribe((result) => {
        this.router.navigate(['/profile/' + this.ExtUserData.idCard]);
      }, (err) => {
        console.log(err);
      });

    }
  }

  Back() {
    if (this.role == 'ADM') {
      this.router.navigate(['/profile/' + this.userData.idCard]);
    } else if (this.role == 'TECH') {
      this.router.navigate(['/profile/' + this.ExtUserData.idCard]);
    }
  }

  TestDetails(id: string) {
    this.router.navigate([`/covtestDetail/${id}`])
  }

  RemoveTest(covtest:string, id:string){
    this.ExtUserService.removeTestFromList(covtest, id).subscribe((result)=>{
      this.ExtUserData.covtest = result.covtest
    })
  }

}

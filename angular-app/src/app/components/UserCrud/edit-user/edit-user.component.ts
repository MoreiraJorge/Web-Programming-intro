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
      this.role = data.role
    });
  }

  getData() {
    if (this.role == 'ADM') {
      this.TechUserService.getTechByID(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.userData = data;
      });
    } else if (this.role == 'ADM') {
      this.ExtUserService.getExtByID(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.userData = data;
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

    } else if (this.role == 'ADM') {
      
    }
  }

  Back() {
    this.router.navigate(['/profile/' + this.userData.idCard]);
  }

}

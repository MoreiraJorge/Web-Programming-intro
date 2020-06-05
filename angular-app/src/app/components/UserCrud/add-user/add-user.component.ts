import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { TechUserService } from 'src/app/services/tech-user.service';
import { SessionService } from 'src/app/services/session.service';
import { ExtUserService } from 'src/app/services/ext-user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {
  name: string;
  address: string;
  age: number;
  email: string;
  password: string;
  phoneNumber: number;
  idCard: string;

  role: string

  @Input() userData: User = new User(this.name, this.address, this.age, this.email, this.password, this.phoneNumber);

  constructor(private route: ActivatedRoute, private router: Router,
    private TechUserService: TechUserService,
    public sessionService: SessionService,
    private ExtUserService: ExtUserService) { }

  ngOnInit(): void {
    this.getMe()
  }

  getMe() {
    this.sessionService.me().subscribe((data: User) => {
      if(data === null){
        this.role = ''
      } else {
        this.role = data.role
      }
    });
  }

  addUser() {
    if (this.role == 'ADM') {
      this.TechUserService.addTech(this.userData).subscribe((result: User) => {
        console.log(result);
        window.location.reload();
      }, (err) => {
        console.log(err);
      });

    } else if (this.role == 'TECH') {
      this.ExtUserService.addExt(this.userData).subscribe((result: User) => {
        console.log(result);
        window.location.reload();
      }, (err) => {
        console.log(err);
      });
    }
  }

}

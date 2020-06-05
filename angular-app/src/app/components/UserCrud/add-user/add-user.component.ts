import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { TechUserService } from 'src/app/services/tech-user.service';

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

  @Input() userData: User = new User(this.name, this.address, this.age, this.email, this.password, this.phoneNumber);

  constructor(private route: ActivatedRoute, private router: Router, 
    private TechUserService: TechUserService) { }

  ngOnInit(): void {
  }

  addTech() {
    this.TechUserService.addTech(this.userData).subscribe((result: User) => {
      console.log(result);
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }


}

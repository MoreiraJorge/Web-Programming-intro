import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router} from '@angular/router';
import { TechUserService } from 'src/app/services/tech-user.service';

@Component({
  selector: 'app-list-techuser',
  templateUrl: './list-techuser.component.html',
  styleUrls: ['./list-techuser.component.sass']
})
export class ListTechuserComponent implements OnInit {

  users:User[]

  constructor(private route: ActivatedRoute, private router: Router, private TechUserService: TechUserService) { }

  ngOnInit(): void {
    this.TechUserService.getTechs().subscribe((users) => {
      this.users = users;
      console.log(JSON.stringify(users))
    }, (err) => { console.log(err) })
  }

  add(){
    this.router.navigate(['/techMng/addTech']);
  }

}

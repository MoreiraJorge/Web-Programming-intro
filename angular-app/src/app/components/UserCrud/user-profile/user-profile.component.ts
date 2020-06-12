import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechUserService } from 'src/app/services/tech-user.service';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { ExtUserService } from 'src/app/services/ext-user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  user: User;
  role: string;

  displayedColumns: string[] = ['ID', 'Data'];

  constructor(private route: ActivatedRoute, private router: Router,
    private ExtUserService: ExtUserService, 
    private TechUserService: TechUserService, 
    public sessionService: SessionService) { }

  ngOnInit(): void {
    this.getMe()
    this.getUser()  
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

  getUser(){
    if(this.role == 'ADM'){
      this.TechUserService.getTechByID(this.route.snapshot.params['id']).subscribe((user: User) => {
        this.user = user;
      });
    }else if(this.role == 'TECH'){
      this.ExtUserService.getExtByID(this.route.snapshot.params['id']).subscribe((user: User) => {
        this.user = user;
      });
    }
  }

  edit(id: string) {
    this.router.navigate([`/edit/${id}`])
  }

  usrMng(){
    this.router.navigate(['/usrMng']);
  }
}

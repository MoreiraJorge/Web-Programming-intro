import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { TechUserService } from 'src/app/services/tech-user.service';
import { ExtUserService } from 'src/app/services/ext-user.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.sass']
})
export class ListUserComponent implements OnInit {

  users: User[]
  role: string

  constructor(private route: ActivatedRoute, private router: Router,
    public sessionService: SessionService,
    private TechUserService: TechUserService, private ExtUserService: ExtUserService) {
  }

  ngOnInit(): void {
    this.getMe()
    this.getUsers()
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

  getUsers() {
    if (this.role == 'ADM') {
      this.TechUserService.getTechs().subscribe((users) => {
        this.users = users;
      }, (err) => { console.log(err) })

    } else if (this.role == 'TECH') {
      this.ExtUserService.getExternals().subscribe((users) => {
        this.users = users;
      }, (err) => { console.log(err) })
    }
  }

  add() {
    this.router.navigate(['/addUsr']);
  }

  userDetails(id: string) {
    this.router.navigate([`/profile/${id}`])
  }

  Delete(id: string) {
    if (this.role == 'ADM') {
      this.TechUserService.deleteTech(id)
        .subscribe(res => {
          this.getUsers();
        }, (err) => {
          console.log(err);
        }
        );
    } else if (this.role == 'TECH') {
      this.ExtUserService.deleteExt(id)
        .subscribe(res => {
          this.getUsers();
        }, (err) => {
          console.log(err);
        }
        );
    }
  }

  Dashboard() {
    if (this.role == 'ADM') {
      this.router.navigate(['/admDashboard'])
    } else if (this.role == 'TECH') {
      this.router.navigate(['/techDashboard'])
    }
  }


}

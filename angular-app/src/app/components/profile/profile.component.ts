import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechUserService } from 'src/app/services/tech-user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private router: Router, private TechUserService: TechUserService) { }

  ngOnInit(): void {
    this.getTech()  
  }

  getTech(){
    this.TechUserService.getTechByID(this.route.snapshot.params['id']).subscribe((user: User) => {
      this.user = user;
    });
  }

  edit(id: string) {
    this.router.navigate([`/edit/${id}`])
  }

  TechMng(){
    this.router.navigate(['/techMng']);
  }

}

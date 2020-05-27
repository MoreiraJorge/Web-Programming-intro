import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent implements OnInit {

  @Input()
  user:User

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  seeProfile(){
    this.router.navigate(['/labApp/profile']);
  }

}

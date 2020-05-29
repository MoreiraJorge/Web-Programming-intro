import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-ext-dashboard',
  templateUrl: './ext-dashboard.component.html',
  styleUrls: ['./ext-dashboard.component.sass']
})
export class ExtDashboardComponent implements OnInit {

  @Input()
  user: User

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  seeProfile() {
    this.router.navigate(['/profile']);
  }

}

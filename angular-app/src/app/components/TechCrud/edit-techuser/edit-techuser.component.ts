import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechUserService } from 'src/app/services/tech-user.service';

@Component({
  selector: 'app-edit-techuser',
  templateUrl: './edit-techuser.component.html',
  styleUrls: ['./edit-techuser.component.sass']
})
export class EditTechuserComponent implements OnInit {

  @Input() userData: any = { name: '', address: '', age: 0, email: '', password: '', phoneNumber: 0, idCard: '' };

  constructor(private route: ActivatedRoute, private router: Router, private TechUserService: TechUserService) { }

  ngOnInit(): void {
    this.TechUserService.getTechByID(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.userData = data;
    });
  }

  update() {
    var idTemp = this.route.snapshot.params['id'];
    this.TechUserService.updateTech(idTemp, this.userData).subscribe((result) => {
      this.router.navigate(['/profile/' + this.userData.idCard]);
    }, (err) => {
      console.log(err);
    });
  }

  Back(){
    this.router.navigate(['/profile/' + this.userData.idCard]);
  }
}

import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username:String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
                      private flashMessages: FlashMessagesService,
                      private auth: AuthService,
                      private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      name : this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    //Required Fields 
    if(!this.validateService.validateRegister(user)){
      this.flashMessages.show("Campos nao preenchidos", {cssClass:'alert-danger'});
      
    }
    //Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessages.show("Email Invalido", {cssClass:'alert-danger'});
    }

    //Register user on BackEnd
    this.auth.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessages.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessages.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }
}

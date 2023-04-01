import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  signUpForm = new FormGroup({
    email: new FormControl('')!,
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private location: Location, private router: Router, private AuthService : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let email = this.signUpForm.get('email')?.value;
    let password = this.signUpForm.get('password')?.value;
    if(email && password) {
      this.AuthService.register(email, password).then(cred=>{
        this.router.navigateByUrl('/main');
        console.log('cred')
      }).catch(error=>{console.log(error)})
    }
      
    
  }

  goBack() {
    this.location.back();
  }
  toLogin(){
    this.router.navigateByUrl("/login");
  }
}

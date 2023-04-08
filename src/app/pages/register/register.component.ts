import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/model/User';
import { UserService } from '../../shared/services/user.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  signUpForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('',Validators.required),
    name: new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('',Validators.required)
    })
  });

  constructor(
    private location: Location, 
    private router: Router, 
    private AuthService : AuthService, 
    private UserService : UserService,
    private SnackBarService : SnackBarService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let email = this.signUpForm.get('email')?.value;
    let password = this.signUpForm.get('password')?.value;
    let rePassword = this.signUpForm.get('rePassword')?.value;
    let vnev = this.signUpForm.get('name.firstname')?.value;
    let knev = this.signUpForm.get('name.lastname')?.value;

    if(!email || !password || !rePassword || !vnev || !knev){
      console.log(rePassword);
      this.SnackBarService.openWithMessage("Hiányzó!");
    }else if(password !== rePassword){
      this.SnackBarService.openWithMessage("Nem egyező jelszavak!");
    }
    
    if(email && password && password === rePassword) {
      this.AuthService.register(email, password).then(cred=>{
        const user : User = {
          id: cred.user?.uid as string,
          email : email as string,
          name: {
            firstname : this.signUpForm.get('name.firstname')?.value as string,
            lastname : this.signUpForm.get('name.lastname')?.value as string
          }  
        }
        this.UserService.create(user).then(()=>{
          this.SnackBarService.openWithMessage("Sikeres regisztráció!")
          this.router.navigateByUrl('/main');
        }).catch(error=>{
            this.SnackBarService.openWithMessage("Váratlan hiba történt.")
        });
       
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

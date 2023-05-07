import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FakeLoadingService } from 'src/app/shared/services/fake-loading.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl('', [Validators.email, Validators.required])
  password = new FormControl('', [Validators.minLength(8), Validators.required]);

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router,
    private loadingService: FakeLoadingService,
    private authService : AuthService,
    private snackBarService : SnackBarService) { }

  ngOnInit(): void {
  }
  async login() {

    if(!this.email.valid) {
      this.snackBarService.openWithMessage("Helytelen email cím!");
    }
    if(!this.password.valid) {
      this.snackBarService.openWithMessage("Hibás jelszó!");
    }
    if(!this.email || !this.password){
      this.snackBarService.openWithMessage("Hiányzó adatok!");
    }
    if(this.email.valid && this.password.valid
      && this.password.value && this.email.value) {
      this.authService.login(this.email.value, this.password.value).then((cred)=>{
          this.snackBarService.openWithMessage("Sikeres bejelentkezés!");
          this.router.navigateByUrl("/main");
      }).catch(error=>{
        this.snackBarService.openWithMessage("Hibás email cím vagy jelszó!");
      });
    }
    else{
      this.snackBarService.openWithMessage("Hiányzó adatok!");
    }
    try {
      if(this.email.value && this.password.value){
        const _ = await this.loadingService.loadingWithPromise(this.email.value, this.password.value).then(()=>{
          this.router.navigateByUrl('/main');
        }).catch(error=>{
          console.log("sikeres bejentkezés")
        })
      }
    } catch (error) {
      console.error(error);
    }


  }

}

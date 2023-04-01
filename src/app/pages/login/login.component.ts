import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FakeLoadingService } from 'src/app/shared/services/fake-loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private loadingService: FakeLoadingService, private authService : AuthService) { }

  ngOnInit(): void {
  }
  async login() {
    if(this.email.value && this.password.value) {
      this.authService.login(this.email.value, this.password.value).then((cred)=>{

      }).catch(error=>{
        console.log("failed authentication")
      });
    }
    try {
      // then
      if(this.email.value && this.password.value){
        const _ = await this.loadingService.loadingWithPromise(this.email.value, this.password.value)
        this.router.navigateByUrl('/main');
      }
    } catch (error) {
      // catch
      console.error(error, 'Incorrect email or password!');
    }
    // finally
    console.log('this is executed finally.');


  }

}

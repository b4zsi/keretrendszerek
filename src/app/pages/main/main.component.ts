import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {User} from '../../shared/model/User';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    loggedUser? : firebase.default.User | null;
    user:Array<User> = [];

  constructor(
    private userService: UserService,
    private router : Router
  ){}
  
  ngOnInit():void {
    this.loggedUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User
    if(this.loggedUser && this.loggedUser.email){
        this.userService.getByEmail(this.loggedUser.email).pipe(take(1)).subscribe(user=>{
            this.user = user;
        });
    }
  }
    navigateToSite(nev:string) {
      this.router.navigateByUrl("/"+nev);
    }
}

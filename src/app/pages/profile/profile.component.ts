import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/shared/model/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  loggedUser?: firebase.default.User | null = null;
  user?: Array<User>;
  isAdmin:boolean = false;
  isLoaded:boolean = false;
  constructor(
    private authService : AuthService,
    private userService : UserService
    ){}

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User
    if(this.loggedUser && this.loggedUser.email){
        this.userService.getByEmail(this.loggedUser.email).pipe(take(1)).subscribe(user=>{
            this.user = user;
        });
    }
    setTimeout(()=>{
      this.isLoaded = true;
    },2000)
  }


}

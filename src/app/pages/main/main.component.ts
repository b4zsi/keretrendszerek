import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {User} from '../../shared/model/User';
import { take } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
    loggedUser? : firebase.default.User | null;
  ngAfterViewInit(): void {
    
  }
  user:Array<User> = [];
  constructor(
    private userService: UserService
  ){}
  ngOnInit():void {
    this.loggedUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User
    if(this.loggedUser && this.loggedUser.email){
        this.userService.getByEmail(this.loggedUser.email).pipe(take(1)).subscribe(user=>{
            this.user = user;
        });
    }
  }
  
}

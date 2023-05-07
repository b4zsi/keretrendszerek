import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email :string, password : string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  register(email:string, password:string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
  getEmailAddress() :string{
    let currentUserEmail:string = '';
    this.auth.user.pipe(take(1)).subscribe(user=>{
      currentUserEmail = user?.email as string;
    })
    return currentUserEmail;
  }
}

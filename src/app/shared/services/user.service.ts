import { Injectable, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../model/User';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  loggedUser?: firebase.default.User | null = null;
  user?: Array<User>;
  collectionName = 'users'

  constructor(private afs :AngularFirestore) { }

  create(user:User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    return this.afs.collection<User>(this.collectionName).valueChanges();

  }
  update(){}
  delete(){}
  getByEmail(email: string){
    return this.afs.collection<User>(this.collectionName, ref => ref.where('email', '==', email)).valueChanges();
  }

  isAdminUser(email:string) :boolean {
   this.getByEmail(email).pipe(take(1)).subscribe(user=>{this.user = user});
   return this.user![0].isAdmin
  }
}

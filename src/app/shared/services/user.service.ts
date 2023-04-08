import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
}

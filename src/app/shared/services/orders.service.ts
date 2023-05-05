import { Injectable } from '@angular/core';
import { Order } from '../model/Order';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private afs: AngularFirestore) { }

  getAllOrders() {
    //kerdd le az osszes ordert
  }

  saveOrder(order:Order):Promise<any> {
    return this.afs.collection('orders').add(order);
  }
}

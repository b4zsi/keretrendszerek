import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/model/Order';
import { DatePipe } from 'src/app/shared/pipes/date-pipe.pipe';

@Component({
  selector: 'app-rendelesek',
  templateUrl: './rendelesek.component.html',
  styleUrls: ['./rendelesek.component.scss']
})
export class RendelesekComponent implements OnInit{

  orders$!: Observable<Order[]>;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.orders$ = this.db.collection<Order>('orders').valueChanges();
  }

}

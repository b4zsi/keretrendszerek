import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../model/Order';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
   email :string = "";


  shippingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    zip: new FormControl('',Validators.required),
  });

  constructor(
    private authService:AuthService,
    private cartService:CartService,
    private orderService:OrdersService,
    private router:Router,
    ) {
    }
    haselement = this.cartService.hasElement()

  submitShippingInfo() {
    let total = this.cartService.getTotal();
    let nev = this.shippingForm.get('name')?.value;
    let cart = this.cartService.getCart();
    let itemek = []
    for(let i = 0;i < cart.length;i++) {
            let item = {termek_nev: cart[i].name, mennyiseg:cart[i].quantity, ar:cart[i].price}
            itemek.push(item);
    }

    const order : Order = {
      nev:nev as string,
      Cim:{
        utca: this.shippingForm.get('address')?.value as string,
        varos: this.shippingForm.get('city')?.value as string,
        megye: this.shippingForm.get('state')?.value as string,
        irszam: this.shippingForm.get('zip')?.value as string,
      },
        Termekek : itemek,
      rendelesDatuma:new Date().getTime(),
      osszesen:total
    }
      this.orderService.saveOrder(order);
      this.cartService.clearCart();
      this.router.navigateByUrl('/main');
  }

}

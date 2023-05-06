import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { Order } from '../model/Order';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router';

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
    private fb: FormBuilder,
    private userService:UserService,
    private cartService:CartService,
    private orderService:OrdersService,
    private router:Router
    ) {
      this.email = this.userService.loggedUser?.email as string;
  }

  submitShippingInfo() {
    console.log(this.userService.user);
    let nev = this.shippingForm.get('name')?.value;
    let cart = this.cartService.getCart();
    let itemek = []
    for(let i = 0;i < cart.length;i++) {
            let item = {termek_nev: cart[i].name, mennyiseg:cart[i].quantity, ar:cart[i].price}
            itemek.push(item);
    }

    const order : Order = {
      email: this.email,
      nev:nev as string,
      Cim:{
        utca: this.shippingForm.get('address')?.value as string,
        varos: this.shippingForm.get('city')?.value as string,
        megye: this.shippingForm.get('state')?.value as string,
        irszam: this.shippingForm.get('zip')?.value as string,
      },
        Termekek : itemek,
      rendelesDatuma:new Date,
      osszesen:4000
    }
      this.orderService.saveOrder(order);
      this.cartService.clearCart();
      this.router.navigateByUrl('/main');
  }

}

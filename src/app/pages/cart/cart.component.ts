import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart: any[] = [];

  constructor(private cartService: CartService) {
    this.cart = cartService.getCart();
  }

  increment(item: any): void {
    item.quantity++;
    this.cartService.updateCart(this.cart);
  }

  decrement(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCart(this.cart);
    }
  }

  remove(item: any): void {
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartService.updateCart(this.cart);
    }
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cart = [];
    this.cartService.clearCart();
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly CART_KEY = 'cart';

  getCart(): any[] {
    const cartData = localStorage.getItem(this.CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  }

  updateCart(cart: any[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
  }

  addToCart(ar : number, nev:string): void {
    let cart = this.getCart();
    const item = { name: nev, price: ar, quantity:1 };
      for(let i of cart) {
        if(i.name === item.name) {
          i.quantity += 1;
          this.updateCart(cart);
          return;
        }
      }
    cart.push(item);
    this.updateCart(cart);
  }


}

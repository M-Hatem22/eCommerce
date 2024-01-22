import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartcountService {

  private cartItemCount = new BehaviorSubject<number>(0);
    constructor() {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const itemCount = orders.reduce((total: number, order: { quantity: number }) => total + order.quantity, 0);
      this.cartItemCount.next(itemCount);
    }
  
    getCartItemCount() {
      return this.cartItemCount.asObservable();
    }
  
    incrementCartItemCount() {
      const itemCount = this.cartItemCount.value + 1;
      this.cartItemCount.next(itemCount);
    }
  
    decrementCartItemCount() {
      const itemCount = this.cartItemCount.value - 1;
      this.cartItemCount.next(itemCount);
    }
  
    clearCart() {
      this.cartItemCount.next(0);
    }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private cartCount = new BehaviorSubject<number>(0);

  getCartItems() {
    return this.cartItems.asObservable();
  }

  getCartCount() {
    return this.cartCount.asObservable();
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { ...product, quantity: 1 }]);
    }

    this.updateCartCount();
  }

  updateQuantity(itemId: number, quantity: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0);

    this.cartItems.next(updatedItems);
    this.updateCartCount();
  }

  removeFromCart(itemId: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItems.next(updatedItems);
    this.updateCartCount();
  }

  private updateCartCount() {
    const count = this.cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount.next(count);
  }

  getTotal() {
    return this.cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, CartItem } from './models/product.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
   styleUrl: './app.component.css'
})
export class AppComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Classic Cheese Burger',
      price: 389,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
      description: 'A mouthwatering cheese burger featuring a perfectly grilled beef patty topped with melted cheddar cheese, fresh lettuce, tomatoes, and our special sauce, all served on a toasted brioche bun.'
    },
    {
      id: 2,
      name: 'Crispy Chicken Burger',
      price: 389,
      image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=500',
      description: 'A delicious chicken burger made with a tender, crispy chicken breast fillet, topped with fresh lettuce, tomatoes, and our signature mayo sauce, served on a soft, toasted bun.'
    },
    {
      id: 3,
      name: 'Premium Beef Burger',
      price: 419,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500',
      description: 'Premium beef burger with caramelized onions, crispy bacon, fresh lettuce, and our special BBQ sauce, served on a freshly baked artisanal bun.'
    },
    {
      id: 4,
      name: 'Spicy Mexican Burger',
      price: 429,
      image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=500',
      description: 'Fiery Mexican-style burger with jalapeños, pepper jack cheese, guacamole, and chipotle mayo, served with crispy tortilla strips.'
    },
    {
      id: 5,
      name: 'Veggie Supreme Burger',
      price: 359,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500',
      description: 'A hearty vegetarian burger made with a seasoned plant-based patty, topped with fresh avocado, grilled mushrooms, and vegan cheese.'
    },
    {
      id: 6,
      name: 'BBQ Bacon Burger',
      price: 439,
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500',
      description: 'Smoky BBQ burger with crispy bacon, cheddar cheese, onion rings, and our homemade BBQ sauce.'
    },
    {
        id: 7,
        name: 'Classic Cheese Burger',
        price: 389,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        description: 'A mouthwatering cheese burger featuring a perfectly grilled beef patty topped with melted cheddar cheese, fresh lettuce, tomatoes, and our special sauce, all served on a toasted brioche bun.'
      },
      {
        id: 8,
        name: 'Crispy Chicken Burger',
        price: 389,
        image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=500',
        description: 'A delicious chicken burger made with a tender, crispy chicken breast fillet, topped with fresh lettuce, tomatoes, and our signature mayo sauce, served on a soft, toasted bun.'
      },
      {
        id: 9,
        name: 'Premium Beef Burger',
        price: 419,
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500',
        description: 'Premium beef burger with caramelized onions, crispy bacon, fresh lettuce, and our special BBQ sauce, served on a freshly baked artisanal bun.'
      },
      {
        id: 10,
        name: 'Spicy Mexican Burger',
        price: 429,
        image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=500',
        description: 'Fiery Mexican-style burger with jalapeños, pepper jack cheese, guacamole, and chipotle mayo, served with crispy tortilla strips.'
      },
      {
        id: 11,
        name: 'Veggie Supreme Burger',
        price: 359,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500',
        description: 'A hearty vegetarian burger made with a seasoned plant-based patty, topped with fresh avocado, grilled mushrooms, and vegan cheese.'
      },
      {
        id: 12,
        name: 'BBQ Bacon Burger',
        price: 439,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500',
        description: 'Smoky BBQ burger with crispy bacon, cheddar cheese, onion rings, and our homemade BBQ sauce.'
      }
  ];

  cartItems: CartItem[] = [];
  cartCount = 0;
  showCart = false;
  showProductDetails = false;
  selectedProduct: Product | null = null;
  searchQuery = '';
  filteredProducts: Product[] = [];

  constructor(private cartService: CartService) {
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);
    this.cartService.getCartCount().subscribe(count => this.cartCount = count);
    this.filteredProducts = this.products;
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredProducts = this.products;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  updateQuantity(itemId: number, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  getItemCount(productId: number): number {
    const item = this.cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }

  showDetails(product: Product) {
    this.selectedProduct = product;
    this.showProductDetails = true;
  }

  getRelatedProducts(): Product[] {
    if (!this.selectedProduct) return [];
    return this.products.filter(p => p.id !== this.selectedProduct?.id);
  }

  buyNow() {
    console.log('Purchase Details:', {
      items: this.cartItems,
      total: this.getTotal()
    });
  }
}

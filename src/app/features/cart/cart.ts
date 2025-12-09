import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { CartItem } from '../produtos/cart-item/cart-item';
import { CartService } from '../../services/cart/cart-service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { OrderService } from '../../services/order/order-service';

@Component({
  selector: 'app-cart',
  imports: [CartItem, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private cartService = inject(CartService);
  private router = inject(Router);
  private orderService = inject(OrderService);

  cart = signal<any>(null);
  loading = signal(true);

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.loading.set(true);
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cart.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  checkout() {
    if(!confirm('Deseja finalizar a compra?')) return;

    this.loading.set(true);

    this.orderService.checkout().subscribe({
      next: (order) => {
        alert('Compra realizada com sucesso!');
        this.router.navigate(['/profile/orders']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Erro ao finalizar compra.');
        this.loading.set(false);
      }
    });
  }
}

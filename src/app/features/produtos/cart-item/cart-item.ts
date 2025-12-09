import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../../models/product';
import { CurrencyPipe } from '@angular/common';
import { PromoPipe } from '../../../shared/pipes/promo-pipe';
import { CartService } from '../../../services/cart/cart-service';

@Component({
  selector: 'cart-item',
  imports: [CurrencyPipe, PromoPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  item = input.required<any>();

  cartChanged = output<void>();

  private cartService = inject(CartService);

  increment() {
    const currentItem = this.item();
    const stock = currentItem.product.stock;

    if (currentItem.quantity <= stock) {
      this.updateQuantity(currentItem.quantity + 1);
    }
  }

  decrement() {
    const qty = this.item().quantity;
    if (qty > 1) {
      this.updateQuantity(qty - 1);
    }
  }

  remove() {
    this.cartService.removeItem(this.item().id).subscribe({
      next: () => this.cartChanged.emit()
    });
  }

  private updateQuantity(newQty: number) {
    this.cartService.updateItemQuantity(this.item().id, newQty).subscribe({
      next: () => this.cartChanged.emit()
    });
  }
}

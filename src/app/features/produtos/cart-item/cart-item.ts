import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';
import { CurrencyPipe } from '@angular/common';
import { PromoPipe } from '../../../shared/pipes/promo-pipe';

@Component({
  selector: 'cart-item',
  imports: [CurrencyPipe, PromoPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  product = input.required<Product>();
}

import { Component, EventEmitter, Output } from '@angular/core';
import { CartItem } from '../produtos/cart-item/cart-item';

@Component({
  selector: 'app-cart',
  imports: [CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
 
}

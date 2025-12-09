import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { PromoPipe } from '../../../shared/pipes/promo-pipe';

@Component({
  selector: 'app-order-item',
  imports: [CurrencyPipe, PromoPipe],
  templateUrl: './order-item.html',
  styleUrl: './order-item.css',
})
export class OrderItem {
  item = input.required<any>();
}

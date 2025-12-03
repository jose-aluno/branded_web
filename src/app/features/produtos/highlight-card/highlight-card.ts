import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';

@Component({
  selector: 'highlight-card',
  imports: [],
  templateUrl: './highlight-card.html',
  styleUrl: './highlight-card.css',
})
export class HighlightCard {
  product = input.required<Product>();
}

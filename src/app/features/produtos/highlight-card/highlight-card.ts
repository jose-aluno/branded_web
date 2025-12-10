import { Component, input, output } from '@angular/core';
import { Product } from '../../../models/product';

@Component({
  selector: 'highlight-card',
  imports: [],
  templateUrl: './highlight-card.html',
  styleUrl: './highlight-card.css',
})
export class HighlightCard {
  product = input.required<Product>();

  view = output<string>();

  onView() {
    const id = this.product().id;
    if (!id) return;
    this.view.emit(id);
  }
}

import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';

@Component({
  selector: 'card-produto',
  imports: [],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css',
})
export class CardProduto {
  product = input.required<Product>();
}

import { Component, input } from '@angular/core';
import { Product } from '../../../models/product';
import { CurrencyPipe } from '@angular/common';
import { PromoPipe } from '../../../shared/pipes/promo-pipe';

@Component({
  selector: 'card-produto',
  imports: [CurrencyPipe, PromoPipe],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css',
})
export class CardProduto {
  product = input.required<Product>();


}

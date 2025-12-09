import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../../models/product';
import { CurrencyPipe } from '@angular/common';
import { PromoPipe } from '../../../shared/pipes/promo-pipe';
import { CartService } from '../../../services/cart/cart-service';

@Component({
  selector: 'card-produto',
  imports: [CurrencyPipe, PromoPipe],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css',
})
export class CardProduto {
  product = input.required<Product>();

  view = output<string>();

  private cartService = inject(CartService);

  onView() {
    const id = this.product().id;
    if (!id) return;
    this.view.emit(id);
  }

  onQuickAdd(event: Event) {
    event.stopPropagation(); 

    const p = this.product();
    
    if (!p || !p.id) {
        return;
    }
    
    if (p.stock < 1) {
        alert('Produto esgotado!');
        return;
    }

    this.cartService.addItem(p.id, 1).subscribe({
      next: () => {
        alert('Produto adicionado!');
      },
      error: () => alert('Erro ao adicionar')
    });
  }
}

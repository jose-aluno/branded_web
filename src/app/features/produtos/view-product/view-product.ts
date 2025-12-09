import { Component, inject, signal } from '@angular/core';
import { Footer } from '../../../core/footer/footer';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product/product-service';
import { Product } from '../../../models/product';
import { CurrencyPipe } from '@angular/common';
import { PromoPipe } from '../../../shared/pipes/promo-pipe';
import { CartService } from '../../../services/cart/cart-service';

@Component({
  selector: 'app-view-product',
  imports: [Footer, CurrencyPipe, PromoPipe],
  templateUrl: './view-product.html',
  styleUrl: './view-product.css',
})
export class ViewProduct {
  private route = inject(ActivatedRoute)
  private productService = inject(ProductService)
  private cartService = inject(CartService);

  product = signal<Product | null>(null)
  quantity = signal(1);
  addingToCart = signal(false);

  constructor(){
    this.route.paramMap.subscribe(pm => {
      const id = String(pm.get('id'))

      this.productService.findById(id).subscribe(product => {
        this.product.set(product)
        this.quantity.set(1);
      })
    })
  }

  increment() {
    const p = this.product();
    if (p && this.quantity() < p.stock) {
      this.quantity.update(q => q + 1);
    }
  }

  decrement() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  addToCart() {
    const p = this.product();
    if (!p || !p.id) {
        return;
    }

    this.addingToCart.set(true);

    this.cartService.addItem(p.id, this.quantity()).subscribe({
      next: () => {
        alert(`Produto(s) adicionado ao carrinho`);
        this.addingToCart.set(false);

      },
      error: (err) => {
        console.error(err);
        alert('Erro ao adicionar ao carrinho.');
        this.addingToCart.set(false);
      }
    });
  }
}

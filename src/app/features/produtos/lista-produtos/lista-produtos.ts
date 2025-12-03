import { Component, computed, inject, signal } from '@angular/core';
import { HeroSection } from "../../../shared/hero-section/hero-section";
import { CardProduto } from "../card-produto/card-produto";
import { Footer } from "../../../core/footer/footer";
import { ProductService } from '../../../services/product/product-service';
import { Router } from '@angular/router';
import { Product } from '../../../models/product';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lista-produtos',
  imports: [HeroSection, CardProduto, Footer],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  private productService = inject(ProductService)
  private router = inject(Router)

  loading = signal(true);

  readonly itemsPerPage = 20;
  currentPage = signal(1);

  private allProducts = toSignal<Product[], Product[]>(
    this.productService.findAll().pipe(
      finalize(() => this.loading.set(false))
    ),
    { initialValue: [] }
  );

  displayedProducts = computed(() => {
    const products = this.allProducts();
    const page = this.currentPage();
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return products.slice(startIndex, endIndex);
  });

  totalPages = computed(() => {
    return Math.ceil(this.allProducts().length / this.itemsPerPage);
  });

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }
}

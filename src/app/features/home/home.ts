import { Component, computed, inject, signal } from '@angular/core';
import { HeroSection } from '../../shared/hero-section/hero-section';
import { Footer } from '../../core/footer/footer';
import { HighlightCard } from "../produtos/highlight-card/highlight-card";
import { RouterLink } from "@angular/router";
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product/product-service';

@Component({
  selector: 'app-home',
  imports: [HeroSection, Footer, HighlightCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private productService = inject(ProductService);

  private allProducts = toSignal(this.productService.findAll(), { initialValue: [] });
  
  recentProducts = computed(() => {
    return [...this.allProducts()].reverse().slice(0, 10);
  });

  currentIndex = signal(0);
  itemsPerPage = 3;

  maxIndex = computed(() => {
    return Math.max(0, this.recentProducts().length - this.itemsPerPage);
  });

  visibleProducts = computed(() => {
    const start = this.currentIndex();
    return this.recentProducts().slice(start, start + this.itemsPerPage);
  });

  next() {
    const current = this.currentIndex();
    const max = this.maxIndex();

    if (current < max) {
      this.currentIndex.update(v => v + 1);
    } else {
      this.currentIndex.set(0);
    }
  }

  prev() {
    const current = this.currentIndex();
    const max = this.maxIndex();

    if (current > 0) {
      this.currentIndex.update(v => v - 1);
    } else {
      this.currentIndex.set(max);
    }
  }
}

import { Component, inject, signal } from '@angular/core';
import { Footer } from '../../../core/footer/footer';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product/product-service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-view-product',
  imports: [Footer],
  templateUrl: './view-product.html',
  styleUrl: './view-product.css',
})
export class ViewProduct {
  private route = inject(ActivatedRoute)
  private productService = inject(ProductService)

  product = signal<Product | null>(null)
  loading = signal(true)

  constructor(){
    this.route.paramMap.subscribe(pm => {
      const id = String(pm.get('id'))

      this.loading.set(true)
      this.productService.findById(id).subscribe(product => {
        this.product.set(product)
      })
    })
  }
}

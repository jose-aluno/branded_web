import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css',
})
export class CreateProduct {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    imageUrl: ['', Validators.required],
    artist: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0.01)]],
    stock: [null, [Validators.required, Validators.min(0)]],
    //isPromo: [false], 
    description: ['']
  });

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      newProduct.price = Number(newProduct.price);
      newProduct.stock = Number(newProduct.stock);

      this.productService.createProduct(newProduct).subscribe({
        next: (res) => {
          alert('Produto criado com sucesso!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error', err);
          alert('Erro ao criar produto.');
        }
      });
    } else {
      alert('Fill all the blank inputs.');
      this.productForm.markAllAsTouched();
    }
  }
}

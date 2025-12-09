import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://branded-api.onrender.com/branded';

  cartCount = signal(0);

  addItem(productId: string, quantity: number = 1): Observable<any> {
    const payload = {
      productId: productId,
      quantity: quantity
    };

    return this.http.post(`${this.apiUrl}/cartItem`, payload)
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart`);
  }

  updateItemQuantity(itemId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cartItem/${itemId}`, { quantity })
  }

  removeItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cartItem/${itemId}`)
  }

}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  
  private readonly apiUrl = 'https://branded-api.onrender.com/branded';

  
  checkout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, {});
  }

 
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Address } from '../../models/address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly apiUrl = 'https://branded-api.onrender.com/branded/address';

  private http = inject(HttpClient)

  findByUserId(id: string): Observable<Address>{
    return this.http.get<Address>(`${this.apiUrl}/${id}`,)
  } 

  createAddress(address: Address): Observable<Address>{
    return this.http.post<Address>(this.apiUrl, address);
  }

  updateAddress(id: string, address: any): Observable<Address>{
    return this.http.put<Address>(`${this.apiUrl}/${id}`, address);
  }
}

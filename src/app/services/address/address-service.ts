import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Address } from '../../models/address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly apiUrl = 'https://branded-api.onrender.com/branded/address';

  constructor(private http: HttpClient){}

  createAddress(address: Address): Observable<Address>{
    return this.http.post<Address>(this.apiUrl, address);
  }
}

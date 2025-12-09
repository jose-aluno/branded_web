import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'https://branded-api.onrender.com/branded/users'

  constructor(private http: HttpClient) { }

  findById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  update(id: string, userData: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, User } from '../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly apiUrl = 'https://branded-api.onrender.com/branded'

  constructor(private http: HttpClient) { }

  login(credentials: {email: string, password: string}): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token)
          localStorage.setItem('user_data', JSON.stringify({
            id: response.userId, 
            name: response.userName
          }));
        })
      );
  }

  register(userData: User): Observable<{message: string, user: User}> {
    return this.http.post<{message: string, user: User}>(`${this.apiUrl}/users`, userData)
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  }

  getUserIdFromStorage(): string | null {
    if (typeof localStorage !== 'undefined') {
      const userDataStr = localStorage.getItem('user_data');
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          return userData.id;
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken()
    return !!token
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user_data')
  }
}

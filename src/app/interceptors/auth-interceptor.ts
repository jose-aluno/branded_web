import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const token = authService.getToken();
  
  let authReq = req;
  
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: any) => {
      
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (!req.url.includes('/login')) {
            console.warn('Sessão expirada. Redirecionando para login...');
            authService.logout();
            router.navigate(['/register']);
        }
      }
      
      return throwError(() => error);
    })
  );
};

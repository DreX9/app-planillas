import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.token;

  // No enviar token en login
  if (req.url.includes('/auth/authenticate')) {
    return next(req);
  }

  // No enviar token si es /info o cualquier endpoint público
  if (req.url.includes('/info')) {
    return next(req);
  }

  console.log("🔎 Interceptor ejecutado");
  console.log("URL:", req.url);
  console.log("TOKEN ENVIADO:", token);
  
  // Agregar token solo si es válido
  if (token && token !== 'undefined' && token !== 'null') {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloneReq);
  }

  return next(req);

};

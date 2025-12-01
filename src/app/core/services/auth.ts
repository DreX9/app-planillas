import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CredentialsInterface } from '../../shared/model/credentials-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private URL = `${environment.apiURL}/auth/authenticate`;
  private TOKEN_KEY = 'access_token';

  // Estado inicial basado en si hay token (solo en navegador)
  private isAuth = new BehaviorSubject<boolean>(this.hasToken());
  public isAutenticado$ = this.isAuth.asObservable();

  // ----------------------------
  //   METODOS PROTEGIDOS SSR
  // ----------------------------

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private hasToken(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get token(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  guardarToken(token: string) {
    if (!this.isBrowser()) return;
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isAuth.next(true);
  }

  logout() {
    if (!this.isBrowser()) return;
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuth.next(false);
  }

  // ----------------------------
  //   PETICIÓN AL BACKEND
  // ----------------------------
  authenticate(credenciales: CredentialsInterface) {
    return this.http.post<any>(this.URL, credenciales);
  }

}

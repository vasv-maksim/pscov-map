import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from './model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token = null;
  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('api/auth/login', user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token);
          localStorage.setItem('login', user.login);
          this.setToken(token);
        })
      );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('api/auth/register', user);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuth() {
    return !!this.token;
  }

  logout() {
    this.token = null;
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}

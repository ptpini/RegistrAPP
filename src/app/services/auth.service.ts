import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string): Observable<boolean> {
    if (email === 'test@example.com' && password === '123456') {
      this.loggedIn = true; // Cambia el estado de loggedIn al iniciar sesión exitosamente
      return of(true); // Simula un login exitoso
    } else {
      this.loggedIn = false;
      return of(false); // Simula un login fallido
    }
  }

  logout(): void {
    this.loggedIn = false;
  }
}

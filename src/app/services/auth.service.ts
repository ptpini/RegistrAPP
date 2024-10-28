import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage, private apiService: ApiService) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  // Método para enviar el correo de restablecimiento de contraseña
  resetPassword(email: string): Observable<any> {
    return this.apiService.sendPasswordResetEmail(email);
  }

  // Autenticación con la API
  login(email: string, password: string): Observable<boolean> {
    return this.apiService.authenticateUser({ email, password }).pipe(
      tap(async (response) => {
        if (response.success) {
          await this.storage.set('isLoggedIn', true);
          await this.storage.set('auth_token', response.token); // Guarda el token
        }
      }),
      map(response => response.success) // Transforma el observable para devolver solo un booleano
    );
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.storage.get('isLoggedIn') || false;
  }

  async logout() {
    await this.storage.remove('isLoggedIn');
    await this.storage.remove('auth_token'); // Elimina el token al cerrar sesión
  }
}

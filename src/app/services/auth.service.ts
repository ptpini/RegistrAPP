import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _storage: Storage | null = null;

  constructor(private apiService: ApiService, private storage: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    this._storage = await this.storage.create();
  }

  async isLoggedIn(): Promise<boolean> {
    return (await this._storage?.get('isLoggedIn')) || false;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.apiService.authenticateUser({ username, password }).pipe(
      tap(async (response: any) => {
        if (response.access) {
          await this._storage?.set('isLoggedIn', true);
          await this._storage?.set('auth_token', response.access);
        }
      }),
      map((response: any) => !!response.access),
      catchError((error) => {
        console.error('Error en el login:', error);
        throw new Error('Error en el inicio de sesión');
      })
    );
  }

  register(username: string, password: string): Observable<boolean> {
    return this.apiService.registerUser({ username, password }).pipe(
      map((response: any) => response.success),
      catchError((error) => {
        console.error('Error en el registro:', error);
        throw new Error('Error al registrar usuario');
      })
    );
  }

  resetPassword(email: string): Observable<any> {
    return this.apiService.resetPassword(email).pipe(
      catchError((error) => {
        console.error('Error al enviar el correo de recuperación:', error);
        throw new Error('Error al enviar correo de recuperación');
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

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
      catchError((error: unknown) => {
        console.error('Error en el inicio de sesión:', error);
        throw new Error('Error en el inicio de sesión');
      })
    );
  }

  register(username: string, password: string): Observable<boolean> {
    return this.apiService.registerUser({ username, password }).pipe(
      map((response: any) => response.success),
      catchError((error: unknown) => {
        console.error('Error en el registro:', error);
        throw new Error('Error al registrar usuario');
      })
    );
  }

  resetPassword(email: string): Observable<any> {
    return this.apiService.resetPassword(email).pipe(
      catchError((error: unknown) => {
        console.error('Error al enviar correo de recuperación:', error);
        throw new Error('Error al enviar correo de recuperación');
      })
    );
  }
}

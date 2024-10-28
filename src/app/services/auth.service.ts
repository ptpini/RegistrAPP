import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  login(email: string, password: string): Observable<boolean> {
    if (email === 'test@example.com' && password === '123456') {
      this.storage.set('isLoggedIn', true);
      return of(true);
    } else {
      return of(false);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.storage.get('isLoggedIn') || false;
  }

  async logout() {
    await this.storage.remove('isLoggedIn');
  }
}

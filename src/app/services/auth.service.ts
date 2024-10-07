import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Simulación de autenticación
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user'); // Simula un usuario logueado guardado en el localStorage
    return !!user; // Devuelve true si el usuario existe
  }

  login(user: any) {
    localStorage.setItem('user', JSON.stringify(user)); // Guarda el usuario en localStorage
  }

  logout() {
    localStorage.removeItem('user'); // Elimina el usuario del localStorage
  }
}

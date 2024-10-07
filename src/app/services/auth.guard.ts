import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((user) => {
        if (user) {
          return true; // Si está autenticado, permite acceso
        } else {
          this.router.navigate(['/login']); // Redirige a la página de login
          return false;
        }
      })
    );
  }
}

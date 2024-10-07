import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).then(() => {
      this.router.navigateByUrl('/home'); // Redirige a home después del inicio de sesión exitoso
    }).catch(err => {
      console.error('Error during login', err);
    });
  }
}

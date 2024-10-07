import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string | undefined;

  constructor(private router: Router) {}

  onResetPassword() {
    // Lógica de restablecimiento de contraseña (conexión al servicio de backend)
    console.log('Reset link sent to:', this.email);

    // Redirige al login tras enviar el enlace
    this.router.navigate(['/login']);
  }
}

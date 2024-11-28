import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email = ''; // Email del usuario.

  constructor(private authService: AuthService) {}

  onResetPassword() {
    if (this.email.trim() === '') {
      console.error('El campo de correo electrónico está vacío.');
      return;
    }

    this.authService.resetPassword(this.email).subscribe({
      next: () => {
        console.log('Correo de recuperación enviado correctamente.');
      },
      error: (error) => {
        console.error('Error al enviar el correo de recuperación:', error);
      },
    });
  }
}

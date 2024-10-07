import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de que este archivo exista

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';

  constructor(private authService: AuthService) {}

  onResetPassword() {
    if (this.email) {
      this.authService
        .resetPassword(this.email)
        .then(() => {
          console.log('Correo de restablecimiento enviado');
        })
        .catch((err: any) => {
          console.error(err); // Agrega el tipo `any` a `err`
        });
    } else {
      console.log('Introduce un correo válido');
    }
  }
}

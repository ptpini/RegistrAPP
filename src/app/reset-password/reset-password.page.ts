import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email!: string;

  constructor(private afAuth: AngularFireAuth) {}

  onResetPassword() {
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => console.log('Password reset email sent!'))
      .catch(err => console.error(err));
  }
}

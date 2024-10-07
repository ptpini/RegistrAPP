import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  onSignup() {
    this.authService.signup(this.email, this.password).then(
      () => {
        // Navegar al home después de registrarse
        this.navCtrl.navigateRoot('/home');
      },
      (error) => {
        console.error('Error en registro', error);
      }
    );
  }
}

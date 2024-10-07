import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  onLogin() {
    this.authService.login(this.email, this.password).then(
      () => {
        // Navegar al home después de iniciar sesión
        this.navCtrl.navigateRoot('/home');
      },
      (error) => {
        console.error('Error en inicio de sesión', error);
      }
    );
  }

  goToSignup() {
    this.navCtrl.navigateForward('/signup');
  }
}

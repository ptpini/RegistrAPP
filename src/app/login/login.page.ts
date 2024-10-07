import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email!: string;
  password!: string;

  constructor(private afAuth: AngularFireAuth) {}

  onLogin() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => console.log('Login successful'))
      .catch(err => console.error(err));
  }
}

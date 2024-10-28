import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
    private networkService: NetworkService // Inyectamos el NetworkService para la sincronización
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();

    const isLoggedIn = await this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/home']); // Si está logueado, va al home
    } else {
      this.router.navigate(['/welcome']); // Si no está logueado, va a welcome
    }
  }
}

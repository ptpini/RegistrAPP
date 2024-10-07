import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  scanQRCode() {
    console.log('QR Code scanning initiated...');
    // Código para iniciar el escaneo de código QR.
  }
}

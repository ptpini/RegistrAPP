import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  qrData: string | undefined;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private navCtrl: NavController
  ) {}

  async startScan() {
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      this.qrData = result.content;

      // Enviar la asistencia a la API y guardar localmente
      this.apiService.sendAttendance(result.content).subscribe(
        (response) => {
          console.log('Asistencia registrada con éxito', response);
          this.storageService.saveAttendance(result.content);
        },
        (error) => {
          console.error('Error al registrar asistencia', error);
        }
      );
    } else {
      console.error('No se detectó contenido en el escaneo');
    }
  }

  goToAttendanceHistory() {
    this.navCtrl.navigateForward('/attendance-history');
  }
}

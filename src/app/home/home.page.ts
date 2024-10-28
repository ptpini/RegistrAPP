import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  qrData: string = '';

  constructor(private apiService: ApiService, private storageService: StorageService) {}

  async startScanner() {
    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.qrData = result.content;
      console.log(result.content);

      // Enviar asistencia a la API
      this.apiService.sendAttendance(result.content).subscribe({
        next: (response: any) => {
          console.log('Asistencia registrada con éxito', response);
          this.storageService.saveAttendance(result.content); // Guarda localmente
        },
        error: (error: any) => {
          console.error('Error al registrar asistencia', error);
        },
      });
    } else {
      console.error('No se detectó contenido en el escaneo');
    }
  }
}

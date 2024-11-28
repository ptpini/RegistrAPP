import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { NetworkService } from '../services/network.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  qrData: string = '';

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private networkService: NetworkService
  ) {}

  async startScanner() {
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      this.qrData = result.content;
      console.log('Contenido escaneado:', result.content);

      // Verificar y enviar asistencia a la API
      this.registerAttendance(result.content);
    } else {
      console.error('No se detectó contenido en el escaneo');
    }
  }

  private async registerAttendance(content: string) {
    try {
      if (await this.networkService.isConnected()) {
        this.apiService.sendAttendance(content).subscribe({
          next: (response) => {
            console.log('Asistencia registrada con éxito:', response);
          },
          error: async (error) => {
            console.error('Error al registrar asistencia:', error);
            await this.storageService.saveAttendance(content);
          },
        });
      } else {
        await this.storageService.saveAttendance(content);
        console.log('Asistencia guardada localmente por falta de conexión');
      }
    } catch (error) {
      console.error('Error inesperado en el proceso de asistencia:', error);
    }
  }
}

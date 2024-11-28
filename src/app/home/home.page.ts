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
  qrData: string = ''; // Almacena el contenido del QR escaneado
  userName: string = 'Usuario';

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private networkService: NetworkService
  ) {}

  async ngOnInit() {
    // Recupera el nombre del usuario desde el almacenamiento local
    this.userName = (await this.storageService.get('user_name')) || 'Usuario';
  }

  // Función para iniciar el escaneo del QR
  async startScanner() {
    try {
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.qrData = result.content;
        console.log('Contenido escaneado:', result.content);

        // Registra la asistencia
        this.registerAttendance(result.content);
      } else {
        console.error('No se detectó contenido en el escaneo');
      }
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
    }
  }

  // Registra la asistencia con los datos del QR
  private async registerAttendance(content: string) {
    try {
      if (await this.networkService.isConnected()) {
        // Si hay conexión, envía la asistencia al servidor
        this.apiService.sendAttendance(content).subscribe({
          next: (response) => {
            console.log('Asistencia registrada con éxito:', response);
          },
          error: async (error) => {
            console.error('Error al registrar asistencia:', error);
            await this.storageService.saveAttendance(content); // Guarda localmente si falla
          },
        });
      } else {
        // Si no hay conexión, guarda la asistencia localmente
        await this.storageService.saveAttendance(content);
        console.log('Asistencia guardada localmente por falta de conexión');
      }
    } catch (error) {
      console.error('Error inesperado en el proceso de asistencia:', error);
    }
  }
}

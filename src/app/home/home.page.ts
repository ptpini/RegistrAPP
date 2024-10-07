import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  qrData: string | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,      // Asegúrate de tener el servicio correctamente inyectado
    private storageService: StorageService  // Asegúrate de que el servicio de almacenamiento esté bien inyectado
  ) {}

  async scanQRCode() {
    try {
      const permission = await BarcodeScanner.checkPermission({ force: true });

      if (permission.granted) {
        await BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan();

        if (result.hasContent) {
          this.qrData = result.content;
          console.log(result.content);

          // Enviar asistencia a la API
          this.apiService.sendAttendance(result.content).subscribe(
            (response) => {
              console.log('Asistencia registrada con éxito', response);
              this.storageService.saveAttendance(result.content);  // Guarda la asistencia en local
            },
            (error) => {
              console.error('Error al registrar asistencia', error);
            }
          );
        } else {
          console.error('No se detectó contenido en el escaneo');
        }
      } else {
        console.error('Permiso no concedido');
      }

    } catch (error) {
      console.error('Error en la lectura del QR', error);
    } finally {
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    }
  }

  navigateToAttendanceHistory() {
    this.router.navigate(['/attendance-history']);
  }
}

import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { AttendanceService } from './attendance.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  constructor(private network: Network, private attendanceService: AttendanceService) {
    this.network.onConnect().subscribe(() => {
      console.log('Conexión restablecida. Sincronizando asistencias...');
      this.attendanceService.syncAttendance();
    });
  }

  isConnected(): boolean {
    return this.network.type !== 'none';
  }
}

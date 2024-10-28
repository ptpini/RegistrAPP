import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { AttendanceService } from './attendance.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  constructor(private network: Network, private attendanceService: AttendanceService) {
    this.network.onConnect().subscribe(() => {
      this.attendanceService.syncAttendance();
    });
  }
}

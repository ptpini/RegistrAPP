import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.page.html',
  styleUrls: ['./attendance-history.page.scss'],
})
export class AttendanceHistoryPage implements OnInit {
  attendanceRecords: any[] = [];
  filteredRecords: any[] = [];
  filter: 'all' | 'synced' | 'pending' = 'all';

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.loadAttendanceRecords();
  }

  async loadAttendanceRecords() {
    this.attendanceRecords = await this.storageService.getAllAttendances();
    this.applyFilter();
  }

  applyFilter() {
    if (this.filter === 'synced') {
      this.filteredRecords = this.attendanceRecords.filter(record => record.isSynced);
    } else if (this.filter === 'pending') {
      this.filteredRecords = this.attendanceRecords.filter(record => !record.isSynced);
    } else {
      this.filteredRecords = [...this.attendanceRecords];
    }
  }

  async syncPendingRecords() {
    const pendingRecords = this.attendanceRecords.filter(record => !record.isSynced);
    for (let record of pendingRecords) {
      try {
        await this.apiService.sendAttendance(record.content).toPromise();
        await this.storageService.updateAttendanceStatus(record.content);
        console.log('Asistencia sincronizada:', record.content);
      } catch (error) {
        console.error('Error al sincronizar asistencia:', record.content, error);
      }
    }
    await this.loadAttendanceRecords();
    this.showSyncAlert();
  }

  async showSyncAlert() {
    const alert = await this.alertController.create({
      header: 'Sincronización',
      message: 'La sincronización de asistencias pendientes se ha completado.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from './api.service';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(private storage: Storage, private apiService: ApiService) {}

  // Guarda el registro de asistencia en el almacenamiento local
  async saveLocalAttendance(record: any) {
    let records = await this.storage.get('attendance_records') || [];
    records.push(record);
    await this.storage.set('attendance_records', records);
  }

  // Subir un registro de asistencia a la API
  uploadAttendance(record: any): Observable<any> {
    return this.apiService.postAttendanceRecord(record).pipe(
      tap(async () => {
        // Si el registro se sube exitosamente, elimínalo del almacenamiento local
        let records = await this.storage.get('attendance_records') || [];
        records = records.filter((r: { id: any; }) => r.id !== record.id);
        await this.storage.set('attendance_records', records);
      })
    );
  }

  // Sincroniza todos los registros locales con la API cuando haya conexión
  async syncAttendance() {
    const records = await this.storage.get('attendance_records') || [];
    for (let record of records) {
      this.uploadAttendance(record).subscribe({
        error: (err) => console.error('Error al sincronizar el registro:', err)
      });
    }
  }
}

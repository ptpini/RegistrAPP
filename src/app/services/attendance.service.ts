import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private apiService: ApiService, private storageService: StorageService) {}

  syncAttendance(): Observable<any> {
    // Implementa la lógica para sincronizar la asistencia, si es necesario
    throw new Error('syncAttendance no está implementado');
  }
}

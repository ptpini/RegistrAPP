import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.registrapp.duocuc.cl/attendance'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Autenticación con la API
  authenticateUser(data: any): Observable<{ success: boolean, token?: string }> {
    return this.http.post<{ success: boolean, token?: string }>(`${this.apiUrl}/authenticate`, data);
  }

  // Ejemplo de obtener los datos de asistencia
  getAttendanceRecords(): Observable<any> {
    return this.http.get(`${this.apiUrl}/attendance`);
  }

  // Ejemplo de subir un registro de asistencia
  postAttendanceRecord(record: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/attendance`, record);
  }
}

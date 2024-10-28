import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.registrapp.duocuc.cl'; // Cambia esto a la URL real de la API

  constructor(private http: HttpClient) {}

  // Método para enviar la asistencia
  sendAttendance(content: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attendance`, { content });
  }

  // Autenticación con la API
  authenticateUser(data: any): Observable<{ success: boolean, token?: string }> {
    return this.http.post<{ success: boolean, token?: string }>(`${this.apiUrl}/authenticate`, data);
  }

  // Obtener los datos de asistencia
  getAttendanceRecords(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/attendance`);
  }

  // Subir un registro de asistencia
  postAttendanceRecord(record: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attendance`, record);
  }

  // Método para enviar el correo de restablecimiento de contraseña
  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { email });
  }
}

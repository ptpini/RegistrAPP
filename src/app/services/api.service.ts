import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/'; // Cambia según tu configuración

  constructor(private http: HttpClient) {}

  authenticateUser(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, credentials);
  }

  registerUser(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, data);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}reset-password/`, { email });
  }

  sendAttendance(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}attendance/`, data);
  }
}

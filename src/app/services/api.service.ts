import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.registrapp.duocuc.cl/attendance'; // Cambia esta URL a la de tu API

  constructor(private http: HttpClient) {}

  sendAttendance(data: string): Observable<any> {
    return this.http.post(this.apiUrl, { qrData: data });
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://tu-api-url.com'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  // Método GET para obtener datos desde la API
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/endpoint`);
  }

  // Método POST para enviar datos a la API
  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/endpoint`, data);
  }
}

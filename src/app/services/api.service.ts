import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.example.com/data'; // Cambia esto por tu URL real

  constructor(private http: HttpClient) { }

  // Método para obtener los datos de la API
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente (navegador)
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error del servidor: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage); // Aquí puedes agregar más lógica como mostrar una notificación
    return throwError(errorMessage); // Devolvemos el error para que el componente lo maneje
  }
}

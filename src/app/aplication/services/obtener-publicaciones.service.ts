import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerPublicacionesService {

  private apiUrl = 'http://localhost/TFG/APIS/publicaciones/getPublicaciones.php'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  getPublicaciones(idUsuario: number): Observable<any[]> {
    // Realizar la solicitud HTTP para obtener las publicaciones del usuario
    return this.http.get<any[]>(`${this.apiUrl}?id=${idUsuario}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerPublicacionesService {

  // private apiUrl = 'http://localhost/TFG/APIS/publicaciones/getPublicaciones.php';

  private apiUrl = 'https://newcoup.es/PHP/APIS/publicaciones/getPublicaciones.php'

  constructor(private http: HttpClient) { }

  getPublicaciones(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?id=${idUsuario}`);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerMensajesService {

  private apiUrl = 'http://localhost/TFG/APIS/mensajeria/obtenerMensajes.php'; 

  constructor(private http: HttpClient) {}

  getMessages(id_Usuario1: number, id_Usuario2: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ id_Usuario1, id_Usuario2 });
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}

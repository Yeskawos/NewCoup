import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearMensajeriaService {

  private apiUrl = 'http://localhost/TFG/APIS/mensajeria/crearChat.php'; // Ajusta la URL según sea necesario

  constructor(private http: HttpClient) { }

  getCoincidencias(id_Usuario: number): Observable<any> {
    const params = new HttpParams().set('id_Usuario', id_Usuario.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerUsuarioService {

  private apiUrl = 'http://localhost/TFG/APIS/ObtenerDatosUsuario';
  ids: number[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getUserByPreference(preferencias: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUserByPreference.php`, { params: { preferencias } });
  }

}

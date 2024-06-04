import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviarMensajesService {

  private apiUrl = 'http://localhost/TFG/APIS/mensajeria/enviarMensaje.php';

  constructor(private http: HttpClient) { }

  enviarMensaje(idUsuarioRemitente: number, idUsuarioRecibe: number, mensaje: string) {
    const body = { idUsuarioRemitente, idUsuarioRecibe, mensaje };
    return this.http.post<any>(this.apiUrl, body);
  }
}

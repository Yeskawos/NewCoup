import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteMessageService {

    // private apiUrl = 'http://localhost/TFG/APIS/mensajeria/eliminarMensaje.php';

    private apiUrl = 'https://newcoup.es/PHP/APIS/mensajeria/eliminarMensaje.php'

    constructor(private http: HttpClient) { }

    deleteMessage(id_Mensaje: number) {
      const body = { id_Mensaje };
      return this.http.post<any>(this.apiUrl, body);
    }
}

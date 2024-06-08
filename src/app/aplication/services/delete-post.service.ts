import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeletePostService {

    // private apiUrl = 'http://localhost/TFG/APIS/publicaciones/addPublicacion.php';

    private apiUrl = 'https://newcoup.es/PHP/APIS/publicaciones/eliminarPublicacion.php';

  constructor(private http: HttpClient) { }

  deletePost(id_Publicacion: number) {
    const body = { id_Publicacion };
    return this.http.post<any>(this.apiUrl, body);
  }
  
}

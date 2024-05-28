import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarLikeService {

  private apiUrl = 'http://localhost/TFG/APIS/likes/darLike.php'; // Cambia esta URL según tu configuración

  constructor(private http: HttpClient) { }

  addLike(id_Usuario1: number): Observable<any> {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const id_Usuario2 = user.id_Usuario; // ID del usuario guardado en localStorage

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = JSON.stringify({ id_Usuario1, id_Usuario2 });
      return this.http.post<any>(this.apiUrl, body, { headers });
    } else {
      console.error('No se encontró ningún usuario en el almacenamiento local.');
      return new Observable(observer => {
        observer.error('No se encontró ningún usuario en el almacenamiento local.');
      });
    }
  }
}

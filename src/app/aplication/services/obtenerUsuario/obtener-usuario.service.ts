import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerUsuarioService {

  private apiUrl = 'http://localhost/TFG/APIS/ObtenerDatosUsuario/getUserByPreference.php';
  ids: number[] = [];

  preferencias: string = 'Hombre';

  constructor(
    private http: HttpClient
  ) { }

  getUserByPreference(): Observable<any> {
    const maxId = this.ids.length > 0 ? Math.max(...this.ids) : 0;
    const params = new HttpParams().set('max_id', maxId.toString()).set('genero', this.preferencias);
    return this.http.get<any>(this.apiUrl, { params });
  }

  addUserId(id: number): void {
    this.ids.push(id);
  }

  getIds(): number[] {
    return this.ids;
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerUsuarioService{

  private apiUrl = 'http://localhost/TFG/APIS/ObtenerDatosUsuario/getUserByPreference.php';
  ids: number[] = [];

  preferencias: string = '';

  constructor(
    private http: HttpClient
  ) { 
    this.inicializarPreferencias();
  }

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

  inicializarPreferencias(){
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.preferencias = user.preferencias || '';
    }
  }

}

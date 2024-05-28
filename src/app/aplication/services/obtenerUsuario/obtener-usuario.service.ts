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
    this.getUserByPreference();
  }

  getUserByPreference(): void {
    const maxId = this.ids.length > 0 ? Math.max(...this.ids) : 0;
    
    // Obtener el objeto user del localStorage
    const userData = localStorage.getItem('user');
    
    // Verificar si el objeto user existe y tiene el campo id_Usuario
    if (userData) {
      const user = JSON.parse(userData);
      var id_Usuario = user.id_Usuario;
    } else {
      console.error('No se encontró ningún usuario en el almacenamiento local.');
    }
    
    // Crear los parámetros de la solicitud HTTP
    const params = new HttpParams()
        .set('max_id', maxId.toString())
        .set('genero', this.preferencias)
        .set('id_Usuario', id_Usuario);
    this.http.get<any>(this.apiUrl, { params })
    .subscribe(user => {
      // Guardar el usuario en local storage
      console.log("user", user);
      this.saveUserToLocalStorage(user);
    }, error => {
      console.error('Error al obtener el usuario:', error);
    });
  }

  private saveUserToLocalStorage(user: any): void {
    if (localStorage.getItem('userActual')) {
      localStorage.removeItem('userActual');
    }
    // Guardar el nuevo usuario
    localStorage.setItem('userActual', JSON.stringify(user));
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

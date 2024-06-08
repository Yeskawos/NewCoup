import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerUsuarioService{

  // private apiUrl = 'https://localhost/TFG/APIS/ObtenerDatosUsuario/getUserByPreference.php';
  // private apiUrlLikes = 'http://localhost/TFG/APIS/likes/obtenerLikesId.php'; 
  
  private apiUrl = 'https://newcoup.es/PHP/APIS/ObtenerDatosUsuario/getUserByPreference.php';
  private apiUrlLikes = 'https://newcoup.es/PHP/APIS/likes/obtenerLikesId.php'

  ids: number[] = [];

  preferencias: string = '';

  constructor(
    private http: HttpClient
  ) { 
    this.inicializarPreferencias();
    this.getUserByPreference();
  }

  async getUserByPreference() {
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
    .subscribe(async user => {
      // if(await this.isIdUserLiked(user.id_Usuario)){
      //   this.addUserId(user.id_Usuario);
      //   this.deleteUserFromLocalStorage();
      //   this.getUserByPreference();
      //   console.log("Ya has dado like");
      // }else{
        // Guardar el usuario en local storage
        // console.log("user", user);
        console.log("user", user.id_Usuario);
        this.saveUserToLocalStorage(user);
      // }
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

  deleteUserFromLocalStorage(){
    if (localStorage.getItem('userActual')) {
      localStorage.removeItem('userActual');
    }
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


  isIdUserLiked(idUsuario: number) {
    const userData = localStorage.getItem('user');
    if(userData){
      const user = JSON.parse(userData);
      const id_Usuario = user.id_Usuario;

      return this.http.post<any>(this.apiUrlLikes, { idUsuario })
      .pipe(
        map(data => {
          if (data.success) {
            const likes = data.likes;
            return likes.includes(id_Usuario);
          } else {
            // Si la solicitud a la API no fue exitosa, retornar false
            return false;
          }
        })
      );
    } else {
      // Si no se encontró el usuario en el localStorage, retornar false
      return of(false);
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost/TFG/APIS/login/login.php';  // Actualiza esto con la ruta correcta a tu API
  private user: any = null;

  constructor(private http: HttpClient) {}

  login(correoElectronico: string, contrasenya: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { correoElectronico, contrasenya }).pipe(
      map(response => {
        if (response.success) {
          this.user = response.user;
          console.log(this.user);
          // Guarda el usuario en localStorage después de iniciar sesión exitosamente
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        return response;
      }),
      catchError(error => {
        console.error('Error al iniciar sesión:', error);
        return of({ error: 'Error de conexión con el servidor' });
      })
    );
  }

  getUser(): any {
    return this.user;
  }

  removeUserFromLocalStorage(): void {
    localStorage.removeItem('user');
    this.user = null; // Limpiar la variable
  }

  private getItemFromLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  private setItemInLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
}

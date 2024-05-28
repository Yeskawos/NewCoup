import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  private apiUrl = 'http://localhost/TFG/APIS/login/login.php';  // Actualiza esto con la ruta correcta a tu API
  private user: any = {};

  private esAdmin: boolean = false;

  constructor(private http: HttpClient) {
    this.loadUserFromLocalStorage();
    if (this.user.tipoCuenta === 'admin') {
      this.esAdmin = true;
    }
  }

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

  private loadUserFromLocalStorage(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  logout(): void {
    this.user = null;
    this.esAdmin = false
    localStorage.removeItem('user');
    localStorage.removeItem('userActual');
  }

  getAdmin(): boolean {
    return this.esAdmin;
  }
  
}

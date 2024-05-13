import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviarCorreoServiceService {

  constructor(
    private http: HttpClient
  ) { }

  enviarCorreo(correo: string) {
    return this.http.get<any>('http://localhost/TFG/correo5.php?correo=' + correo);
  }
  
  
}

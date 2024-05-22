import { Injectable, OnInit } from '@angular/core';
import { DatosRegistro } from '../../interfaces/register.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnInit{

  numberPage: number = 0;
  datos: DatosRegistro = {};
  base64Image: string = '';

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {

  }

  setImage(base64Image: string) {
    this.base64Image = base64Image;
  }

  introducirDatos( objeto: DatosRegistro, page: number ) {
    if( page === 1 ) {
      // Guardar los datos de la página uno en el objeto "datos"
      this.datos.userName = objeto.userName;
      this.datos.fechaNacimiento = objeto.fechaNacimiento
      this.datos.edad = objeto.edad
      this.datos.genero = objeto.genero
      this.datos.orientacionSexual = objeto.orientacionSexual
      this.datos.preferencias = objeto.preferencias
      this.numberPage = 1;
    }else if( page === 2 ){
      this.datos.correo = objeto.correo;
      this.datos.password = objeto.password;
      this.datos.telefono = objeto.telefono;
    }else if ( page === 3 ){
      this.datos.descripcion = objeto.descripcion;
      this.datos.rutaFotos = this.base64Image;
      this.datos.localizacion = objeto.localizacion;

      this.añadirUsuarios();

    }
    // console.log(this.datos);
    // console.log(this.numberPage);
  }

  async añadirUsuarios() {
    try {
        const response: any = await this.http.post('http://localhost/TFG/APIS/introducirUsuarios/usuarios.php', this.datos).toPromise();
        console.log('Respuesta de la API:', response);
        if (response.success) {
            console.log('Base64 de la imagen:', response.rutaFotos);
        } else {
            console.error('Error en la API:', response.error);
        }
    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }
}

  
}


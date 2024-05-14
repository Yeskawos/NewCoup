import { Injectable, OnInit } from '@angular/core';
import { DatosRegistro } from '../../interfaces/register.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnInit{

  numberPage: number = 0;

  datos: DatosRegistro = {};

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {

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
      this.datos.rutaFotos = 'C:/Apache24/htdocs/TFG/Fotos/' + this.datos.userName;
      this.datos.localizacion = objeto.localizacion;

      this.añadirUsuarios();

    }
    console.log(this.datos);
    console.log(this.numberPage);
  }

  añadirUsuarios() {
    return this.http.post('http://localhost/TFG/APIS/introducirUsuarios/usuarios.php', this.datos);
  }
  
}

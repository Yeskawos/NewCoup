import { Injectable, OnInit } from '@angular/core';
import { DatosRegistro } from '../../interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnInit{

  numberPage: number = 0;

  datos: DatosRegistro = {};

  constructor() { }

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
    }
    console.log(this.datos);
    console.log(this.numberPage);
  }
}

import { Injectable, OnInit } from '@angular/core';
import { DatosRegistro } from '../../interfaces/register.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnInit{

  numberPage: number = 0;
  datos: DatosRegistro = {};
  base64Image: string = '';

  // private apiUrl = 'http://localhost/TFG/APIS/introducirUsuarios/usuarios.php';

  private apiUrl = 'https://newcoup.es/PHP/APIS/introducirUsuarios/usuarios.php'

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
        const response: any = await this.http.post(this.apiUrl, this.datos).toPromise();
        // console.log('Respuesta de la API:', response);
        if (response.success) {
          alert('Registro de sesión válido!!');
            // console.log('Base64 de la imagen:', response.rutaFotos);
        } else {
            alert(response.error);
        }
    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }
  }

}


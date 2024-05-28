import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosPublicacion } from '../../interfaces/publicacion.interface';

@Injectable({
  providedIn: 'root'
})
export class NewPublicationService {

  private apiUrl = 'http://localhost/TFG/APIS/publicaciones/addPublicacion.php';

  base64Image: string = '';
  datos: DatosPublicacion = {};

  constructor(private http: HttpClient) {}

  setImage(base64Image: string) {
    this.base64Image = base64Image;
  }

  introducirDatos(objeto: DatosPublicacion) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user.id_Usuario;
      this.datos.id_Usuario = userId;
      
      this.datos.descripcion = objeto.descripcion;
      this.datos.rutaFotos = this.base64Image;
  
      this.addPublicacion();
    } else {
      console.error('No se encontró ningún usuario en el almacenamiento local.');
    }
  }
  

  async addPublicacion() {
    try {
        const response: any = await this.http.post(this.apiUrl, this.datos).toPromise();
        console.log('Respuesta de la API:', response);
        if (response.success) {
            // console.log('Base64 de la imagen:', response.rutaFotos);
        } else {
            alert(response.error);
        }
    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }
  }

}

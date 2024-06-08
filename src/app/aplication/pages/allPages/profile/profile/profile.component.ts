import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ObtenerPublicacionesService } from '../../../../services/obtener-publicaciones.service';
import { GetPublicacion } from '../../../../../interfaces/GetPublicacion.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { DeletePostService } from '../../../../services/delete-post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user: any;
  publicaciones: GetPublicacion[] = [];

  constructor(
    private userService: UserService,
    private getPublicaciones: ObtenerPublicacionesService,
    private deletePostService: DeletePostService,
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user.id_Usuario;
      const userIdsArray = [userId]; // Metemos el id_Usuario en un array

      this.userService.getUsersByIds(userIdsArray)
      .subscribe(
        response => {
          if (response.success) {
            this.user = response.usuarios[0]; // Dado que solo hay un usuario
          } else {
            console.error(response.error);
          }
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    } else {
      console.error('No se encontró ningún usuario en el almacenamiento local.');
    }
    this.loadUserPosts();
  }

  async loadUserPosts() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user.id_Usuario;

      // Llamar al servicio para obtener las publicaciones del usuario actual
      await this.getPublicaciones.getPublicaciones(userId)
      .subscribe(
        (data: GetPublicacion[]) => {
          console.log(data);
          this.publicaciones = data;
        },
        error => {
          console.error('Error al obtener las publicaciones del usuario:', error);
        }
      );
    } else {
      console.error('No se encontró ningún usuario en el almacenamiento local.');
    }
  }


  deletePost(id_Publicacion: number): void {
    this.deletePostService.deletePost(id_Publicacion)
    .subscribe(
      response => {
        console.log('Publicación eliminada:', response);
        this.loadUserPosts();
      },
      error => {
        console.error('Error al eliminar la publicación:', error);
      }
    );
  }
}

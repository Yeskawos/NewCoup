import { Component } from '@angular/core';
import { GetPublicacion } from '../../../../../interfaces/GetPublicacion.interface';
import { UserService } from '../../../../services/user.service';
import { ObtenerPublicacionesService } from '../../../../services/obtener-publicaciones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-visited',
  templateUrl: './profile-visited.component.html',
  styleUrl: './profile-visited.component.css'
})
export class ProfileVisitedComponent {

  user: any;
  publicaciones: GetPublicacion[] = [];
  userId: number = 0;

  constructor(
    private userService: UserService,
    private getPublicaciones: ObtenerPublicacionesService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id') || '0', 10);
    });
      const userIdsArray = [this.userId];
      this.userService.getUsersByIds(userIdsArray)
      .subscribe(
        response => {
          if (response.success) {
            this.user = response.usuarios[0];
          } else {
            console.error(response.error);
          }
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    this.loadUserPosts();
  }

  async loadUserPosts() {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id') || '0', 10);
    });
      await this.getPublicaciones.getPublicaciones(this.userId)
      .subscribe(
        (data: GetPublicacion[]) => {
          console.log(data);
          this.publicaciones = data;
        },
        error => {
          console.error('Error al obtener las publicaciones del usuario:', error);
        }
      );
  }
}

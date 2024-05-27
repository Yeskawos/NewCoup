import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user.id_Usuario;
      const userIdsArray = [userId]; // Metemos el id_Usuario en un array

      this.userService.getUsersByIds(userIdsArray).subscribe(
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
  }
}

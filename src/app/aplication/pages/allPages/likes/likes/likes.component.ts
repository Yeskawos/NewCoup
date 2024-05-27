import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.css'
})
export class LikesComponent {

  likedUsers: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const likes = localStorage.getItem('user');
    if (likes) {
      const likedUserIds = likes.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id));
      console.log(likedUserIds)
      this.userService.getUsersByIds(likedUserIds).subscribe(
        userResponse => {
          if (userResponse.success) {
            this.likedUsers = userResponse.usuarios;
          } else {
            console.error(userResponse.error);
          }
        },
        error => {
          console.error('Error al obtener la información de los usuarios:', error);
        }
      );
    } else {
      console.error('No se encontraron likes en el almacenamiento local');
    }
  }

}

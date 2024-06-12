import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.css'
})
export class LikesComponent {

likedUsers: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        if (user.likes) {
            const likedUserIds = user.likes.split(',').map((id: any) => parseInt(id.trim(), 10)).filter((id: any) => !isNaN(id));
            // console.log( likedUserIds);
            this.userService.getUsersByIds(likedUserIds)
            .subscribe(
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
    } else {
        console.error('No se encontró ningún usuario en el almacenamiento local');
    }
}

goToChat(id: number): void {
    this.router.navigate(['/newCoup/profile', id]);
}


}

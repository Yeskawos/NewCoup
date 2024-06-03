import { Component, OnInit } from '@angular/core';
import { CrearMensajeriaService } from '../../../../services/crear-mensajeria.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrl: './mensajeria.component.css'
})
export class MensajeriaComponent implements OnInit{

  coincidencias: number[] = [];
  usuariosCoincidencias: any[] = [];

  constructor(
    private coincidenciasService: CrearMensajeriaService,
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user.id_Usuario;

      this.coincidenciasService.getCoincidencias(userId)
      .subscribe(
        response => {
          if (response.success) {
            this.coincidencias = response.coincidencias;
            console.log('Coincidencias' , this.coincidencias)
            const userIds = this.coincidencias.map((c: any) => c.id_Usuario2);
            this.userService.getUsersByIds(userIds)
            .subscribe(
              userResponse => {
                this.usuariosCoincidencias.push(userResponse);
                console.log(this.usuariosCoincidencias)
              },
              error => {
                console.error('Error al obtener los detalles del usuario:', error);
              }
            );
          } else {
            console.error(response.error);
          }
        },
        error => {
          console.error('Error al obtener las coincidencias:', error);
        }
      );
    } else {
      console.error('No se encontró el usuario en el almacenamiento local');
    }
  }

  // goToChat(id: number): void {
  //   this.router.navigate(['/mensajeria', id]);
  // }


  // getIdCoincidenciaByUsuario2(id_Usuario2: any) {
  //   console.log(id_Usuario2)
  //   this.coincidencias.forEach(element => {
  //     console.log('element', element.id_Usuario2)
  //   });
  //   return 0;
  // }
  
}

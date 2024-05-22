import { Component, OnInit } from '@angular/core';
import { ObtenerUsuarioService } from '../../../services/obtenerUsuario/obtener-usuario.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  user: any = null;
  preferencias: string = 'Hombre';
  imageUrl: string | null = null;

  ids: number[] = [];

  constructor(
    private userService: ObtenerUsuarioService,
  ) { }

  ngOnInit(): void {
    this.llamadaServicio()
      .subscribe(
        response => {
          if (response.error) {
            console.error('Error:', response.error);
          } else {
            if (this.ids.includes(response.id_Usuario)) {
              // El ID ya está en la lista, no hagas nada
            } else {
              this.user = response;
              this.ids.push(response.id_Usuario);
              if (this.user.imagenBase64) {
                this.imageUrl = this.user.imagenBase64;
              }
            }
          }
          console.log(this.ids)
        },
        error => {
          console.error('Error al obtener el usuario:', error);
        }
      );
  }
  
  llamadaServicio(): Observable<any> {
    return this.userService.getUserByPreference(this.preferencias);
  }
}  

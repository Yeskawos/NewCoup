import { Component, OnInit } from '@angular/core';
import { ObtenerUsuarioService } from '../../../../services/obtenerUsuario/obtener-usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  user: any = {};
  imageUrl: string | null = null;

  constructor( 
    private userService: ObtenerUsuarioService,
  ){}

  ngOnInit(): void {
    this.loadUser();
  }

  onDrag(event: DragEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.opacity = "0.5";
    }
  }
  
  onDragEnd(event: DragEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.style.opacity = "1";
    }
  }
  
  onDragOver(event: DragEvent, targetId: string): void {
    event.preventDefault();
    document.getElementById(targetId)?.classList.add('dragover');
  }

  onDragLeave(targetId: string): void {
    document.getElementById(targetId)?.classList.remove('dragover');
  }

  onDrop(event: DragEvent, targetId: string): void {
    event.preventDefault();
    document.getElementById(targetId)?.classList.remove('dragover');
    
    if (targetId === 'like') {
      this.loadUser();
      console.log("like");
    } else if (targetId === 'dislike') {
      this.loadUser();
      console.log("dislike");
    }
  }  


  loadUser(): void {
    this.userService.getUserByPreference()
    .subscribe(
      response => {
        if (response.error) {
          console.error('Error:', response.error);
        } else {
          if (!this.userService.getIds().includes(response.id_Usuario)) {
            this.user = response;
            this.userService.addUserId(response.id_Usuario);
            if (this.user.imagenBase64) {
              this.imageUrl = this.user.imagenBase64;
            }
          }
        }
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
    console.log(this.userService.ids);
  }

}

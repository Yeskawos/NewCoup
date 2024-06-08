import { Component, OnInit } from '@angular/core';
import { ObtenerUsuarioService } from '../../../../services/obtenerUsuario/obtener-usuario.service';
import { DarLikeService } from '../../../../services/dar-like.service';
import { CrearCoincidenciaService } from '../../../../services/crear-coincidencia.service';
import { Router } from '@angular/router';

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
    private likesService: DarLikeService,
    private crearCoincidenciaService: CrearCoincidenciaService,
    private router: Router,
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadUser();
    }, 100);
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
      this.addLike();
      this.userService.getUserByPreference();
      setTimeout(() => {
        this.loadUser();
      }, 300);
      console.log("like");
    } else if (targetId === 'dislike') {
      this.userService.getUserByPreference();
      setTimeout(() => {
        this.loadUser();
      }, 300);
      console.log("dislike");
    }
  }  

  onLike(event: Event){
    event.preventDefault();
    this.addLike();
      this.userService.getUserByPreference();
      setTimeout(() => {
        this.loadUser();
      }, 300);
      console.log("like");
  }

  onDislike(event: Event){
    event.preventDefault();
    this.userService.getUserByPreference();
      setTimeout(() => {
        this.loadUser();
      }, 300);
      console.log("dislike");
  }


  async loadUser() {
    const user = localStorage.getItem('userActual');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log(parsedUser)
      if (!this.userService.getIds().includes(parsedUser.id_Usuario)) {
        this.user = parsedUser;
        this.userService.addUserId(parsedUser.id_Usuario);
        if (this.user.imagenBase64) {
          this.imageUrl = this.user.imagenBase64;
        }
      }else{
        this.user = parsedUser;
        if (this.user.imagenBase64) {
          this.imageUrl = this.user.imagenBase64;
        }
      }
    } else {
      this.userService.getUserByPreference();
      await setTimeout(() => {
        this.loadUser();
      }, 200);
      console.error('No se encontró ningún usuario actual en el almacenamiento local.');
    }
    console.log(this.userService.ids);
  }

  async addLike() {
    const userData = localStorage.getItem('user');
    if (userData) {
      var user = JSON.parse(userData);
      var id_Usuario1 = this.user.id_Usuario; 

      await this.likesService.addLike(id_Usuario1)
      .subscribe(response => {
        console.log('Respuesta de la API:', response);
      }, error => {
        console.error('Error al agregar el like:', error);
      });
    } else {
      console.error('No se encontró ningún usuario en el almacenamiento local.');
    }

    if (user.likes) {
      const likedUserIds = user.likes.split(',').map((id: any) => parseInt(id.trim(), 10)).filter((id: any) => !isNaN(id));
      if(likedUserIds.includes(this.user.id_Usuario)){
        await this.crearCoincidenciaService.crearCoincidencia(this.user.id_Usuario, user.id_Usuario)
        .subscribe(
          response => {
              console.log('Coincidencia creada exitosamente:', response);
          },
          error => {
              console.error('Error al crear la coincidencia:', error);
          }
      );
      }
    } else {
        console.error('No se encontraron likes en el almacenamiento local');
    }
  }

  goToChat(id: number): void {
    this.router.navigate(['/newCoup/profile', id]);
  }

}

import { Component, OnInit } from '@angular/core';
import { EnviarMensajesService } from '../../services/enviar-mensajes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enviarmensaje',
  templateUrl: './enviarmensaje.component.html',
  styleUrl: './enviarmensaje.component.css'
})
export class EnviarmensajeComponent implements OnInit{

  mensaje: string = '';
  chatId?: number;
  id_Usuario: number;

  constructor(
    private enviarMensajeService: EnviarMensajesService,
    private route: ActivatedRoute,
  ) { 
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.id_Usuario = user.id_Usuario;
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.chatId = parseInt(params.get('id') || '0', 10);
      console.log(this.chatId)
    });
  }

  enviarMensaje(): void {
    console.log('Mensaje enviado:', this.mensaje);
    if(this.mensaje != ''){
      this.enviarMensajeService.enviarMensaje(this.id_Usuario, this.chatId!, this.mensaje)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error('Error al enviar el mensaje:', error);
        }
      );
    // También puedes restablecer el campo del mensaje después de enviarlo
    this.mensaje = '';
    }
  }

}

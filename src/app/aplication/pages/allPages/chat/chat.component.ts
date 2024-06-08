import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObtenerMensajesService } from '../../../services/obtener-mensajes.service';
import { DeleteMessageService } from '../../../services/delete-message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensajes?: any[];
  id_Usuario: number;
  chatId?: number;
  intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private messageService: ObtenerMensajesService,
    private eliminarMensajes: DeleteMessageService
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.id_Usuario = user.id_Usuario;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.chatId = parseInt(params.get('id') || '0', 10);
      this.loadMessages();
      this.intervalId = setInterval(() => {
        this.loadMessages();
      }, 1000); 
    });
  }

  loadMessages(): void {
    this.messageService.getMessages(this.id_Usuario, this.chatId!)
    .subscribe(
      response => {
        if (response.success) {
          this.mensajes = response.mensajes;
        } else {
          console.error('Error:', response.error);
        }
      },
      error => {
        console.error('Error al obtener los mensajes:', error);
      }
    );
  }

  ngOnDestroy() {
    // Limpiar el intervalo cuando el componente se destruye
    clearInterval(this.intervalId);
  }

  deleteMessage(id_Mensaje: number): void {
    this.eliminarMensajes.deleteMessage(id_Mensaje)
    .subscribe(
      response => {
        console.log('Mensaje eliminado:', response);
        // Maneja la respuesta y actualiza la interfaz según sea necesario
      },
      error => {
        console.error('Error al eliminar el mensaje:', error);
        // Maneja el error
      }
    );
  }
}

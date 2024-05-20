import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  onDragEnded(event: any) {
    const { x, y } = event.distance;
    console.log(`Tarjeta arrastrada a x: ${x}, y: ${y}`);
  }

}

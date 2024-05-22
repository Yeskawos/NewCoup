import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
      alert('Like');
    } else if (targetId === 'dislike') {
      alert('Dislike');
    }
  }  

}

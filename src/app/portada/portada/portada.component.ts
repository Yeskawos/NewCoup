import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css'
})
export class PortadaComponent {

  constructor(private router: Router){}

  redirigir() {
    this.router.navigate(['/auth/login']);
  }
}

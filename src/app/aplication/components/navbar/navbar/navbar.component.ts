import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/loginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  esAdmin: boolean = false;

  listaAdmin = [
    { route: '/newCoup/home', label: 'Inicio' },
    { route: '/newCoup/likes', label: 'Likes' },
    { route: '/newCoup/mensajeria', label: 'Mensajería' },
    { route: '/newCoup/planEstaNoche', label: 'Plan para Esta Noche' },
    { route: '/newCoup/profile', label: 'Perfil' },
    { route: '/newCoup/publicaciones', label: 'Publicaciones' },
    { route: '/newCoup/apis', label: 'APIs' },
    { route: '/newCoup/manageUsers', label: 'Gestionar Usuarios' },
    { route: '/newCoup/reports', label: 'Reportes' }
  ];

  lista = [
    { route: '/newCoup/home', label: 'Inicio' },
    { route: '/newCoup/likes', label: 'Likes' },
    { route: '/newCoup/mensajeria', label: 'Mensajería' },
    { route: '/newCoup/planEstaNoche', label: 'Plan para Esta Noche' },
    { route: '/newCoup/profile', label: 'Perfil' },
    { route: '/newCoup/publicaciones', label: 'Publicaciones' }
  ]

  constructor(
    private authService: LoginService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.esAdmin = this.authService.getAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

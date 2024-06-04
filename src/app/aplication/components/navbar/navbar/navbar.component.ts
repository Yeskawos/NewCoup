import { AfterViewInit, Component, OnInit } from '@angular/core';
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
    { route: '/newCoup/home', label: 'Inicio', icon: 'home' },
    { route: '/newCoup/likes', label: 'Likes', icon: 'favorite' },
    { route: '/newCoup/mensajeria', label: 'Mensajería', icon: 'send' },
    { route: '/newCoup/planEstaNoche', label: 'Plan para Esta Noche', icon: 'favorite' },
    { route: '/newCoup/profile', label: 'Perfil', icon: 'account_circle' },
    { route: '/newCoup/publicaciones', label: 'Publicaciones', icon: 'add' },
    { route: '/newCoup/apis', label: 'APIs', icon: 'lock' },
    { route: '/newCoup/manageUsers', label: 'Gestionar Usuarios', icon: 'lock' },
    { route: '/newCoup/reports', label: 'Reportes', icon: 'lock' }
  ];

  lista = [
    { route: '/newCoup/home', label: 'Inicio', icon: 'home' },
    { route: '/newCoup/likes', label: 'Likes', icon: 'favorite' },
    { route: '/newCoup/mensajeria', label: 'Mensajería', icon: 'send' },
    { route: '/newCoup/planEstaNoche', label: 'Plan para Esta Noche', icon: 'favorite' },
    { route: '/newCoup/profile', label: 'Perfil', icon: 'account_circle' },
    { route: '/newCoup/publicaciones', label: 'Publicaciones', icon: 'add' }
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

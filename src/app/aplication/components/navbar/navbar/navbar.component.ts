import { Component } from '@angular/core';
import { LoginService } from '../../../../services/loginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private authService: LoginService,
    private router: Router,
  ){}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/loginService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasenya: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { correoElectronico, contrasenya } = this.loginForm.value;
      this.loginService.login(correoElectronico, contrasenya)
      .subscribe(
        response => {
          if (response.success) {
            // Redirigir a la página de inicio
            this.router.navigate(['/newCoup/home']);
          } else {
            alert(response.error); // Muestra el error al usuario
          }
        },
        error => {
          console.error('Error al iniciar sesión:', error);
          alert('Hubo un error al intentar iniciar sesión. Inténtalo de nuevo más tarde.');
        }
      );
    }
  }

}

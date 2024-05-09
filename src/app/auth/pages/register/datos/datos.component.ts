import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../../services/registerService/register.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosRegistro } from '../../../../interfaces/register.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent implements OnInit {

  formulario!: FormGroup;
  datosFormulario: DatosRegistro = {};

  correoValidado: boolean = false;
  passValidada: boolean = false;
  telefonoValidado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      passw1: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}')]], // this.validarContra
      passw2: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    });
  }

  validarContra(control: AbstractControl): { [key: string]: boolean } | null {
    const passw1 = control.root.get('passw1')!.value;
    const passw2 = control.value;

    if (passw1 !== passw2) {
      return { 'passwordInvalido': true };
    }
    return null;
  }

  enviarFormulario() {

  }

}

import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../../services/registerService/register.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosRegistro } from '../../../../interfaces/register.interface';
import { Router } from '@angular/router';
import { EnviarCorreoServiceService } from '../../../../services/enviarCorreo/enviar-correo-service.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent implements OnInit {

  formulario!: FormGroup;
  validacion!: FormGroup;
  datosFormulario: DatosRegistro = {};

  correoValidado: boolean = false;
  passValidada: boolean = false;
  telefonoValidado: boolean = false;
  correoReadOnly: boolean = false;

  mostrarTextoContra: boolean = false;

  respuesta: any;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private enviarCorreo: EnviarCorreoServiceService,
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      passw1: ['', [Validators.required]], // this.validarContra
      passw2: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    });

    this.validacion = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(6), Validators.pattern('[0-9]{6}')]],
    });
  }

  validarContra() {
    if (this.formulario.root.get('passw1')!.value != this.formulario.root.get('passw2')!.value) {
      this.passValidada = false;
      this.mostrarTextoContra = true;
    }else{
      this.passValidada = true;
      this.mostrarTextoContra = false;
    }
  }

  enviarFormulario(event: Event) {
    event.preventDefault();
    const correo = this.formulario.get('correo')!.value;
    this.enviarCorreo.enviarCorreo(correo)
    .subscribe(response => {
      this.respuesta = response;
      // console.log('Correo enviado con éxito', response);
      alert('Correo enviado con éxito!')
    }, error => {
      console.error('Error al enviar correo', error);
    });
  }

  finalizarDatos() {
    if (this.formulario.valid) {
      this.datosFormulario.correo = this.formulario.get('correo')!.value;
      this.datosFormulario.password = this.formulario.get('passw1')!.value;
      this.datosFormulario.telefono = this.formulario.get('telefono')!.value;
      this.registerService.introducirDatos(this.datosFormulario, 2);
      this.router.navigate(['/auth/register/descripcion']);
    } else {
      alert('Formulario inválido');
    }
  }

  codigoValido(event: Event) {
    event.preventDefault();
    if(this.respuesta.codigo == this.validacion.get('codigo')!.value){
      this.correoValidado = true;
      this.correoReadOnly = true;
      this.passValidada = true;
    }else{
      alert("Debes introducir un codigo")
      // console.log(this.validacion.get('codigo')!.value)
    }
  }
    
}

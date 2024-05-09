import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosRegistro } from '../../../../interfaces/register.interface';
import { RegisterService } from '../../../../services/registerService/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gustos',
  templateUrl: './gustos.component.html',
  styleUrl: './gustos.component.css'
})
export class GustosComponent implements OnInit{

  formulario!: FormGroup;
  datosFormulario: DatosRegistro = {};

  today!: string;
  edad: number = 0;
  edadIngresada: boolean = false;

  orientacionSexual: string[] = [
    'Heterosexual',
    'Homosexual',
    'Bisexual',
    'Pansexual',
    'Asexual',
    'Queer',
    'Demisexual',
    'Polisexual',
    'Omnisexual',
    'Nanosexual'
  ];

  generos: string[] = [
    'Hombre',
    'Mujer',
    'Hombre cis',
    'Hombre intersexual',
    'Hombre trans',
    'persona transmaculina',
    'Mujer cis',
    'Mujer intersexual',
    'Mujer trans',
    'Persona transfemenina',
    'Agénero',
    'Bigénero',
    'Género fluido',
    'Genderqueer',
    'Intersexual',
    'No binario',
    'Persona trans',
    'Pánsexual',
    'Helicoptero de combate',
    'No está en la lista'
  ]

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
  ) {
     // Obtener la fecha actual
    const date = new Date();
     // Formatear la fecha como YYYY-MM-DD
    this.today = date.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      userName: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      orientacionSexual: ['', Validators.required],
      preferencias: ['', Validators.required],
      edad: ['', [Validators.required, this.validarEdad]]
    });
  }

  calcularEdad() {
    this.edadIngresada = true;
    const fechaNacimiento = this.formulario.get('fechaNacimiento')!.value;
    if (fechaNacimiento) {
      const hoy = new Date();
      const fechaNacimientoDate = new Date(fechaNacimiento);
      let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
      const mesHoy = hoy.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript comienzan desde 0
      const mesNacimiento = fechaNacimientoDate.getMonth() + 1;
      if (mesHoy < mesNacimiento || (mesHoy === mesNacimiento && hoy.getDate() < fechaNacimientoDate.getDate())) {
        edad--;
      }
      this.edad = edad;
      this.formulario.get('edad')!.setValue(this.edad);
    }
  }

  validarEdad(control: AbstractControl): { [key: string]: boolean } | null {
    const edad = control.value;
    if (isNaN(edad) || edad < 18) {
      return { 'edadInvalida': true };
    }
    return null;
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      this.datosFormulario.userName = this.formulario.get('userName')!.value;
      this.datosFormulario.genero = this.formulario.get('genero')!.value;
      this.datosFormulario.orientacionSexual = this.formulario.get('orientacionSexual')!.value;
      this.datosFormulario.preferencias = this.formulario.get('preferencias')!.value;
      this.datosFormulario.edad = this.formulario.get('edad')!.value;
      this.datosFormulario.fechaNacimiento = this.formulario.get('fechaNacimiento')!.value;
      this.registerService.introducirDatos(this.datosFormulario, 1);
      this.router.navigate(['/auth/register/datos']);
    } else {
      alert('Formulario inválido');
    }
  }


  mostrarDatos() {
    console.log('Usuario: ',this.formulario.get('userName')!.value);
    console.log('FechaNac: ',this.formulario.get('fechaNacimiento')!.value);
    console.log('Edad: ',this.formulario.get('edad')!.value);
    console.log('Genero: ',this.formulario.get('genero')!.value);
    console.log('Orientacion: ',this.formulario.get('orientacionSexual')!.value);
    console.log('Preferencias: ',this.formulario.get('preferencias')!.value);
  }


}

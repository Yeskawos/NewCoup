import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosRegistro } from '../../../interfaces/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  formulario!: FormGroup;
  datosFormulario: DatosRegistro = {};

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

  constructor( private formBuilder: FormBuilder ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      userName: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      orientacionSexual: ['', Validators.required],
      preferencias: ['', Validators.required]
    });
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      this.datosFormulario = { ...this.datosFormulario, ...this.formulario.value };
      console.log('Datos del formulario:', this.datosFormulario);
      // Aquí puedes enviar los datos del formulario a tu API
    } else {
      console.error('Formulario inválido');
    }
  }
  
}

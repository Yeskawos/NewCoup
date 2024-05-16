import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../../services/registerService/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosRegistro } from '../../../../interfaces/register.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrl: './descripcion.component.css'
})
export class DescripcionComponent implements OnInit{

  datosFormulario: DatosRegistro = {};
  formulario!: FormGroup;

  selectedFile: File | undefined;

  imageUrl: string | ArrayBuffer | null = null;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      descripcion: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0] as File;
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }
    // else if(!this.registerService.datos.userName){
    //   console.error('No se ha introducido el nombre de usuario.');
    //   return;
    // }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('userName', 'Marcos'); //this.registerService.datos.userName!

    this.http.post('http://localhost/TFG/crearCarpetas/adminFotos.php', formData)
    .subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error => {
        console.error('Error al enviar la imagen:', error);
      }
    );
  }

  previsualizar( event: any) {
    // Obtener el archivo seleccionado
    const selectedFile: File = event.target.files;
    console.log(event.target.files)

    // Verificar si se seleccionó un archivo
    if (!selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }
    
    // Leer el archivo como un URL de datos
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.imageUrl = e.target.result;
      }
    }
    console.log(this.imageUrl);
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.datosFormulario.descripcion = this.formulario.get('descripcion')!.value;
      this.registerService.introducirDatos(this.datosFormulario, 3);
      this.router.navigate(['/auth/register/descripcion']);
    } else {
      alert('Formulario inválido');
    }

  }

  event(event: Event){
    event.preventDefault();
  }

}

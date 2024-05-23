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
  base64Image: string | undefined;

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
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result as string;
      this.registerService.setImage(this.base64Image);
    };
    reader.readAsDataURL(this.selectedFile);
  }

  previsualizar( event: any) {
    const selectedFile: File = event.target.files[0];
    console.log(event.target.files);

    if (!selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.imageUrl = e.target.result;
      }
    };
    reader.readAsDataURL(selectedFile);
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.datosFormulario.descripcion = this.formulario.get('descripcion')!.value;
      this.registerService.introducirDatos(this.datosFormulario, 3);
      // this.router.navigate(['/auth/login']);
    } else {
      alert('Formulario inválido');
    }

  }

  event(event: Event){
    event.preventDefault();
  }

}

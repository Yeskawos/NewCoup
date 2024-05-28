import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewPublicationService } from '../../../../services/new-publication.service';
import { DatosPublicacion } from '../../../../../interfaces/publicacion.interface';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  datosFormulario: DatosPublicacion = {};
  formulario!: FormGroup;

  selectedFile: File | undefined;
  imageUrl: string | ArrayBuffer | null = null;
  base64Image: string | undefined;

  constructor(private fb: FormBuilder, private publicacionesService: NewPublicationService) {
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      fotoPublicacion: [null, Validators.required]
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
      this.publicacionesService.setImage(this.base64Image);
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
      this.publicacionesService.introducirDatos(this.datosFormulario);
    } else {
      alert('Formulario inválido');
    }

  }

  event(event: Event){
    event.preventDefault();
  }
}

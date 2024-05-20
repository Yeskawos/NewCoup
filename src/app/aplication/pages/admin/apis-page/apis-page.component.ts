import { Component, OnInit } from '@angular/core';
import { ObtenerTablasServiceService } from '../../../services/obtener-tablas-service.service';
import { ObtenerCamposServiceService } from '../../../services/obtener-campos-service.service';

@Component({
  selector: 'app-apis-page',
  templateUrl: './apis-page.component.html',
  styleUrl: './apis-page.component.css'
})
export class ApisPageComponent implements OnInit{

  tablas: string[] = [];
  camposTabla: string[] = [];

  tablaSeleccionada: string = '';

  constructor(
    private tablasService: ObtenerTablasServiceService,
    private camposService: ObtenerCamposServiceService,
  ){}

  ngOnInit(): void {
    this.tablasService.obtenerTablas().subscribe(
      data => {
        console.log('Lista de tablas:', data.tablas);
        this.tablas = data.tablas;
      },
      error => {
        console.error('Error al obtener la lista de tablas:', error);
      }
    );
  }

  seleccionarTabla() {
    if (this.tablaSeleccionada) {
      this.camposService.getTableFields(this.tablaSeleccionada)
      .subscribe(
        campos => {
          this.camposTabla = campos;
          console.log('Campos de la tabla:', campos);
        },
        error => {
          console.error('Error al obtener los campos de la tabla:', error);
        }
      );
    }
  }

}

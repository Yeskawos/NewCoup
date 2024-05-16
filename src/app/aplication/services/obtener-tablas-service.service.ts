import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerTablasServiceService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerTablas(): Observable<any> {
    return this.http.get<any>('http://localhost/TFG/APIS/obtenerTablas/tablas.php');
  }

}

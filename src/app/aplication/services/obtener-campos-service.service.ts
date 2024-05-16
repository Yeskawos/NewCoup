import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtenerCamposServiceService {

  apiUrl: string = 'http://localhost/TFG/APIS/obtenerTablas/campos.php';

  constructor(
    private http: HttpClient
  ) { }

  getTableFields(tableName: string) {
    return this.http.get<string[]>(`${this.apiUrl}?tabla=${tableName}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetLikesService {

    // private apiUrl = 'http://localhost/TFG/APIS/likes/obtenerLikesId.php'; 

    private apiUrl = 'https://newcoup.es/PHP/APIS/likes/obtenerLikesId.php'

  constructor(
    private http: HttpClient
  ) { }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfoUrl = 'http://localhost/TFG/APIS/getUserById/getUserById.php'; // Nueva API para obtener usuarios por IDs

  constructor(private http: HttpClient) { }

  getUsersByIds(ids: number[]): Observable<any> {
    return this.http.post<any>(this.userInfoUrl, { ids });
  }
}

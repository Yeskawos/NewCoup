import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private userInfoUrl = 'http://localhost/TFG/APIS/getUserById/getUserById.php'; 

  private userInfoUrl = 'https://newcoup.es/PHP/APIS/getUserById/getUserById.php';

  constructor(private http: HttpClient) { }

  getUsersByIds(ids: number[]): Observable<any> {
    return this.http.post<any>(this.userInfoUrl, { ids });
  }
}

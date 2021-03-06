import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient) { }
  getUser(id): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users/${id}`,
      { headers: this.httpHeaders })
  }
  getUserObjects(id): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users/${id}/objects`,
      { headers: this.httpHeaders })
  }
}

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  login(form): Observable<any> {
    return this.http.post(`${environment.baseUrl}/users/authenticate`, form, { headers: this.httpHeaders })
  }
}

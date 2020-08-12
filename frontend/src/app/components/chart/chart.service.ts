import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    private http: HttpClient
  ) { }
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  getUser(id): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users/${id}/objects`,
      { headers: this.httpHeaders })
  }
}

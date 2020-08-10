import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
 
  constructor(private http: HttpClient) { }
  
  registerUser(user): Observable<any> {
    return this.http.post(environment.baseUrl + '/users',user,{ headers: this.httpHeaders }
    )
  };
  getAllUsers(): Observable<any> {
    return this.http.get(environment.baseUrl + '/users',
      { headers: this.httpHeaders }
    )
  }
}

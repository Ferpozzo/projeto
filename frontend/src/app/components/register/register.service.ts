import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }

  registerUser(user): Observable<User> {
    return this.http.post<User>(environment.baseUrl + '/users', user, { headers: this.httpHeaders }
    )
  };
  getAllUsers(): Observable<User> {
    return this.http.get<User>(environment.baseUrl + '/users',
      { headers: this.httpHeaders }
    )
  }
}

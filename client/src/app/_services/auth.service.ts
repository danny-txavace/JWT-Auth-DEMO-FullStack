import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl : string = environment.serverUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient)
  {}

  //LoginRequest e AuthResponse é uma interface que define a estrutura de um objeto de requisição de login
  //Interfaces que criei
  login(data: LoginRequest):Observable<AuthResponse>
  {
    return this.http
    .post<AuthResponse>(`${this.serverUrl}Account/login`, data).pipe(
      map((response) => {
        if(response.isSuccess)
        {
          localStorage.setItem(this.tokenKey, response.token);
        }
        return response;
      })
    );
  }
}

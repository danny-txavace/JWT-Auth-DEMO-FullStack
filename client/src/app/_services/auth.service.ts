import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';

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

  private getToken = () : string | null => localStorage.getItem(this.tokenKey) || '';

  isLoggedIn = () : boolean =>
  {
    const token = this.getToken();
    if(!token) return false;

    return !this.isTokenExpired();
  }

  private isTokenExpired()
  {
    const token = this.getToken();
    if(!token) return true;

    // npm install jwt-decode
    // Após instalar, confirme a versão no package.json
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if(isTokenExpired) this.logout();
    return isTokenExpired;
  }

  logout = () : void =>
  {
    localStorage.removeItem(this.tokenKey);
  }

  getUserDetail = () =>
  {
    const token = this.getToken();
    if(!token) return null;
    const decodedToken : any = jwtDecode(token);
    const userDetail =
    {
      id : decodedToken.sub,
      fullName : decodedToken.name,
      email : decodedToken.email,
      role : decodedToken.role || []
    }

    return userDetail;
  }

  register(data : RegisterRequest):Observable<AuthResponse>
  {
    return this.http
    .post<AuthResponse>(`${this.serverUrl}Account/register`, data);
  }
}

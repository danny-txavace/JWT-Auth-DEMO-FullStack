import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-detail';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl : string = environment.serverUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient)
  {}

  //  L O G I N
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

  // Usamos no interceptor
  // ng g interceptor interceptor/token
  // é buscado no 'token interceptor' e 'account component'
  getToken = () : string | null => localStorage.getItem(this.tokenKey) || '';


  // Usamos no auth Guard - 'Controlador de rotas'
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

  // Usamos no 'Navbar'
  logout = () : void =>
  {
    localStorage.removeItem(this.tokenKey);
  }

  // Usamos no Profile like(photo, name and role) que está localizado no 'Navbar' canto superior direito da tela
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


  // R E G I S T E R    L O G I N
  register(data : RegisterRequest):Observable<AuthResponse>
  {
    return this.http
    .post<AuthResponse>(`${this.serverUrl}Account/register`, data);
  }


  // V I E W   P R O F I L E do  'Navbar'
  getDetail = () : Observable<UserDetail>=>
    this.http.get<UserDetail>(`${this.serverUrl}Account/detail`);
}

// 2:53:32
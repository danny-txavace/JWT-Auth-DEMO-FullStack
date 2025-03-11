import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolesResponse } from '../interfaces/roles-response';
import { RoleCreateRequest } from '../interfaces/role-create-request';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  serverUrl : string = environment.serverUrl;

  constructor(private http : HttpClient)
  {}

  getRoles = () : Observable<RolesResponse[]>=>
    this.http.get<RolesResponse[]>(`${this.serverUrl}Roles`)

  // Usamos na 'role.component"
  /*
  createRole = (role : RoleCreateRequest) : Observable<AuthResponse>=>
    this.http.post<AuthResponse>(`${this.serverUrl}Roles`, role);
  */
  createRole = (role : RoleCreateRequest) : Observable<{message : string}>=>
    this.http.post<{message : string}>(`${this.serverUrl}Roles`, role);

  delete = (id : string) : Observable<{message : string}>=>
    this.http.delete<{message : string}>(`${this.serverUrl}Roles/${id}`);

  assignRole = (userId : string, roleId : string) : Observable<{message : string}>=>
    this.http.post<{message : string}>(`${this.serverUrl}Roles/assign`, {userId, roleId});
}

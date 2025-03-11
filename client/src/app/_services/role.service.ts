import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolesResponse } from '../interfaces/roles-response';
import { RoleCreateRequest } from '../interfaces/role-create-request';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  serverUrl : string = environment.serverUrl;

  constructor(private http : HttpClient)
  {}

  getRoles = () : Observable<RolesResponse[]>=>
    this.http.get<RolesResponse[]>(`${this.serverUrl}roles`)

  // Usamos na 'role.component"
  createRole = (role : RoleCreateRequest) : Observable<{message : string}>=>
    this.http.post<{message : string}>(`${this.serverUrl}roles`, role);
}

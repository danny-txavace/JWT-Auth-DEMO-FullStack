import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolesResponse } from '../interfaces/roles-response';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  serverUrl : string = environment.serverUrl;

  constructor(private http : HttpClient)
  {}

  getRoles = () : Observable<RolesResponse[]>=>
    this.http.get<RolesResponse[]>(`${this.serverUrl}roles`)
}

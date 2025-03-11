import { Component, inject } from '@angular/core';
import { RoleForm2Component } from "../../_components/role-form2/role-form2.component";
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../_services/role.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleList2Component } from "../../_components/role-list2/role-list2.component";
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-role',
  imports: [
    RoleForm2Component,
    RoleList2Component,
    AsyncPipe,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {
  roleService = inject(RoleService);
  errorMessage = '';
  role : RoleCreateRequest = {} as RoleCreateRequest;
  roleUpdate = this.roleService.getRoles();
  matSnackBar = inject(MatSnackBar);

  //About assignIn
  authService = inject(AuthService);
  selectedUser : string = '';
  users = this.authService.getAll();
  selectedRole : string = '';


  createRole(role : RoleCreateRequest)
  {
    this.roleService.createRole(role).subscribe({
      next : (response : {message : string}) => {
        this.roleUpdate = this.roleService.getRoles();
        this.matSnackBar.open('Role Created Successfully', 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },
      error : (error : HttpErrorResponse) =>
      {
        if(error.status == 400)
        {
          this.errorMessage = error.error;
        }
      }
    });
  }

  deleteRole(id : string)
  {
    this.roleService.delete(id).subscribe({
      next : (response : {message : string}) => {
        this.roleUpdate = this.roleService.getRoles();
        this.matSnackBar.open('Role Deleted Successfully', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },
      error : (error : HttpErrorResponse) =>
      {
        this.matSnackBar.open(error.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });
  }

  assignRole()
  {
    this.roleService.assignRole(this.selectedUser, this.selectedRole).subscribe({
      next : (response : {message : string}) =>
      {
        this.roleUpdate = this.roleService.getRoles();
        this.matSnackBar.open('Role Assign Successfully!', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },
      error : (error : HttpErrorResponse) => {
        this.matSnackBar.open(error.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    })
  }
}

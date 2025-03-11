import { Component, inject } from '@angular/core';
import { RoleService } from '../../_services/role.service';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-list',
  imports: [
    AsyncPipe,
    MatIconModule
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent {
  roleService = inject(RoleService);
  roles = this.roleService.getRoles();
  matSnackBar = inject(MatSnackBar);
  errors! : ValidationErrors[];

  deleteRole(id : string)
  {
    this.roleService.delete(id).subscribe({
      next : (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },
      error : (error : HttpErrorResponse) =>
      {
        if(error!.status === 400)
        {
          this.errors = error!.error;
          this.matSnackBar.open('Validations error', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      }
    });
  }
}

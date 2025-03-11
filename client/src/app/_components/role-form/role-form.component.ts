import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { RoleService } from '../../_services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-form',
  imports: [
    /*
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
    */
   MatFormFieldModule,
   MatInputModule,
   ReactiveFormsModule
  ],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent implements OnInit {
  /*
  @Input({required : true}) role! : RoleCreateRequest;
  @Input() errorMessage! : string;
  @Output() addRole : EventEmitter<RoleCreateRequest> = new EventEmitter<RoleCreateRequest>();

  add()
  {
    this.addRole.emit(this.role)
  }
  */

  roleService = inject(RoleService);
  matSnackBar = inject(MatSnackBar);
  fb = inject(FormBuilder);
  registerForm! : FormGroup;
  errors! : ValidationErrors[];

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      roleName : ['', [Validators.required]]
    });
  }

  add()
  {
    this.roleService.createRole(this.registerForm.value).subscribe({
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

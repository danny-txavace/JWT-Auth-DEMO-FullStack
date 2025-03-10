import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { Router, RouterLink } from '@angular/router';
import { RoleService } from '../../_services/role.service';
import { Observable } from 'rxjs';
import { RolesResponse } from '../../interfaces/roles-response';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from '../../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationErrors } from '../../interfaces/validation-errors';

@Component({
  selector: 'app-register',
  imports: [
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  roleService = inject(RoleService);
  roles! : Observable<RolesResponse[]>;

  // Para Register
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  errors! : ValidationErrors[];

  hide : boolean = true;
  hideConfirm : boolean = true;
  fb = inject(FormBuilder);
  registerForm! : FormGroup;
  router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      fullName : ['', [Validators.required]],
      roles : ['', [Validators.required]],
      password : ['', [Validators.required]],
      confirmPassword : ['', [Validators.required]]
    },
    {
      validator : this.passwordMatchValidator
    }
  );

    this.roles = this.roleService.getRoles();
  }

  private passwordMatchValidator(control : AbstractControl) : { [key : string] : boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password !== confirmPassword)
    {
      return { passwordMismatch : true }
    }

    return null;
  }

  register()
  {
    const formData = this.registerForm.value;

    // Remove 'confirmPassword' se for igual a 'password'
    if(formData.password === formData.confirmPassword)
    {
      delete formData.confirmPassword;
    }
    //console.log(formData)

    this.authService.register(formData).subscribe({
      next : (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        //console.log(response);
        this.router.navigate(['/login']);
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
      },
      complete : () => console.log('Register success!')
    });

  }
}

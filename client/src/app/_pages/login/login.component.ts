import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);

  matSnackBar = inject(MatSnackBar);
  router = inject(Router)

  hide = true; // Hide password and Show password
  form! : FormGroup;
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
  }

  login()
  {
    /*
    funciona
    this.authService.login(this.form.value).subscribe((response) => {
      console.log(response)
    });
    */

    // Com MatSnackBar
    this.authService.login(this.form.value).subscribe({
      next : (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        this.router.navigate(['/'])
      },
      error : (error) => {
        this.matSnackBar.open(error.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });
  }
}
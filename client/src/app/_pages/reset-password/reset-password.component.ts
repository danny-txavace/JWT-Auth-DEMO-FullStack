import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResetPasswordRequest } from '../../interfaces/reset-password-request';
import { AuthService } from '../../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  imports: [
    FormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPassword = {} as ResetPasswordRequest;
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  matSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resetPassword.email = params["email"];
      this.resetPassword.token = params["token"];

      //console.log("Email: ",this.resetPassword.email = params["email"])
      //console.log("Token: ",this.resetPassword.token = params["token"])
    });
  }

  resetPasswordHandle()
  {
    this.authService.resetPassword(this.resetPassword).subscribe({
      next : (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });

        this.router.navigate(['/login']);
      },
      error : (error : HttpErrorResponse) =>
      {
          this.matSnackBar.open(error.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        //console.log(error.message)
      }
    });

    //console.log("Email: ",this.resetPassword.email)
    //console.log("Token: ",this.resetPassword.token)
    //console.log("Password: ",this.resetPassword.newPassword)
  }
}
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forget-password',
  imports: [
    FormsModule,
    MatIconModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  email! : string;
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  showEmailSent = false;
  isSubmitting = false;

  forgetPassword()
  {
    this.isSubmitting = true;
    this.authService.forgotPassword(this.email).subscribe({
      next : (response) =>
      {
        if(response.isSuccess)
        {
          this.matSnackBar.open(response.message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          this.showEmailSent = true;
        }
        else
        {
          this.matSnackBar.open(response.message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      },
      error : (error : HttpErrorResponse) =>
      {
        this.matSnackBar.open(error.message, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },
      complete : () =>
      {
        this.isSubmitting = false;
      }
    });
  }
}

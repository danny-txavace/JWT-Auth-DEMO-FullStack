import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  imports: [
    FormsModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  currentPassword! : string;
  newPassword! : string;
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  changePassword()
  {
    this.authService.changePassword({
      email : this.authService.getUserDetail()?.email,
      currentPassword : this.currentPassword, newPassword : this.newPassword}).subscribe({
        next : (response) => {
          if(response.isSuccess)
          {
            this.matSnackBar.open(response.message, 'Close', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
            this.authService.logout();
            this.router.navigate(['/login']);
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
        error : (err : HttpErrorResponse) => {
          this.matSnackBar.open(err.error.message, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      });
  }
}

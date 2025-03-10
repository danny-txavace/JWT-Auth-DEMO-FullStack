import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const matSnackBar = inject(MatSnackBar);

  if(inject(AuthService).isLoggedIn())
  {
    return true;
  }

  matSnackBar.open('You must be logged in to view this page', 'Ok', {
    duration: 5000,
    verticalPosition: 'bottom',
    horizontalPosition: 'center'
  });

  inject(Router).navigate(['/'])

  return false;
};

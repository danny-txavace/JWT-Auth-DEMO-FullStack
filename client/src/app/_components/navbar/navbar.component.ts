import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { MatMenuModule } from "@angular/material/menu";
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatMenuModule,
    CommonModule // Para usar o *ngIf,.....
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar);

  isLoggedIn()
  {
    return this.authService.isLoggedIn();
  }

  logout = () =>
  {
    this.authService.logout();
    this.matSnackBar.open('Logout success!', 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
    this.router.navigate(['/login'])
  }
}

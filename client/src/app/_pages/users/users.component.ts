import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [
    AsyncPipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  authService = inject(AuthService);
  user = this.authService.getAll();
}
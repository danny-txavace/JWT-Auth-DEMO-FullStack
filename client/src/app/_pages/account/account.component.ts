import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [
    CommonModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  authService = inject(AuthService);
  accountDetail = this.authService.getDetail();
}

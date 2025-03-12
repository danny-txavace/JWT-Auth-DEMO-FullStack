import { Routes } from '@angular/router';
import { LoginComponent } from './_pages/login/login.component';
import { HomeComponent } from './_pages/home/home.component';
import { RegisterComponent } from './_pages/register/register.component';
import { AccountComponent } from './_pages/account/account.component';
import { authGuard } from './_guards/auth.guard';
import { UsersComponent } from './_pages/users/users.component';
import { roleGuard } from './_guards/role.guard';
import { RoleComponent } from './_pages/role/role.component';
import { ForgetPasswordComponent } from './_pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './_pages/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path : '',
    component: HomeComponent
  },
  { path : 'login',
    component: LoginComponent
  },
  { path : 'register',
    component: RegisterComponent
  },
  {
    path : 'account/:id',
    component: AccountComponent,
    canActivate : [authGuard]
  },
  { path : 'account',
    component: AccountComponent,
    canActivate : [authGuard]
  },
  {
    path : 'users',
    component: UsersComponent,
    canActivate : [roleGuard],
    data :
    {
      roles : ['Admin']
    },
  },
  {
    path : 'roles',
    component: RoleComponent,
    canActivate : [roleGuard],
    data :
    {
      roles : ['Admin']
    },
  },
  {
    path : 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path : 'reset-password',
    component: ResetPasswordComponent
  }
];

import { Routes } from '@angular/router';
import { LoginComponent } from './_pages/login/login.component';
import { HomeComponent } from './_pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }
];

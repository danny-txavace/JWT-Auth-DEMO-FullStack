import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from "./_components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}
